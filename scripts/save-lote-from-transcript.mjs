#!/usr/bin/env node
/** Extrae JSON de preguntas del último mensaje del transcript y guarda en data/questions/ */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { jsonrepair } from 'jsonrepair';

function fixGeminiJsonTypos(raw) {
  // Gemini a veces escribe { "id": "D": "texto" } sin la clave "texto"
  return raw.replace(/"id":\s*"([ABCD])":\s*"/g, '"id": "$1", "texto": "');
}

function fixGeminiJsonQuotes(raw) {
  let out = '';
  let i = 0;
  while (i < raw.length) {
    if (raw[i] !== '"') {
      out += raw[i++];
      continue;
    }
    out += '"';
    i++;
    let inner = '';
    while (i < raw.length) {
      if (raw[i] === '\\' && i + 1 < raw.length) {
        inner += raw[i] + raw[i + 1];
        i += 2;
        continue;
      }
      if (raw[i] === '"') {
        let j = i + 1;
        while (j < raw.length && /\s/.test(raw[j])) j++;
        const next = raw[j];
        let isClosing = next === '}' || next === ']' || next === ':';
        if (!isClosing && next === ',') {
          let k = j + 1;
          while (k < raw.length && /\s/.test(raw[k])) k++;
          isClosing = raw[k] === '"';
        }
        if (isClosing) {
          out += inner + '"';
          i++;
          break;
        }
        inner += "'";
        i++;
        continue;
      }
      inner += raw[i++];
    }
  }
  return out;
}

const transcript = process.argv[2];
const outFile = process.argv[3];
const marker = process.argv[4] || 'La escuela de Atenas';

if (!transcript || !outFile) {
  console.error('Uso: node scripts/save-lote-from-transcript.mjs <transcript.jsonl> <out.json> [marker]');
  process.exit(1);
}

const lines = readFileSync(transcript, 'utf8').trim().split('\n');
let json = null;
for (let i = lines.length - 1; i >= 0; i--) {
  const row = JSON.parse(lines[i]);
  const text = row.message?.content?.find((c) => c.type === 'text')?.text || '';
  if (text.includes(marker)) {
    const startBracket = text.indexOf('[');
    const startObj = text.indexOf('{"universidad"');
    const startObjSpaced = text.indexOf('{\n    "universidad"');
    const start =
      startObj >= 0 && (startBracket < 0 || startObj - startBracket <= 5)
        ? startBracket >= 0 ? startBracket : startObj
        : startObjSpaced >= 0
          ? text.lastIndexOf('[', startObjSpaced)
          : startBracket;
    const endFlat = text.lastIndexOf('}]');
    const endMultiline = text.lastIndexOf('\n  }\n]');
    const end = endMultiline >= 0 ? endMultiline + 6 : endFlat + 2;
    if (start >= 0 && end > start) {
      json = text.slice(start, end);
      break;
    }
  }
}

if (!json) {
  console.error(`No se encontró JSON con marker "${marker}"`);
  process.exit(1);
}

const fixed = fixGeminiJsonQuotes(fixGeminiJsonTypos(json));
let arr;
try {
  arr = JSON.parse(fixed);
} catch {
  arr = JSON.parse(jsonrepair(fixed));
}
const dest = resolve(process.cwd(), outFile);
mkdirSync(resolve(dest, '..'), { recursive: true });
writeFileSync(dest, JSON.stringify(arr, null, 2));
console.log(`✅ ${arr.length} preguntas → ${outFile}`);
