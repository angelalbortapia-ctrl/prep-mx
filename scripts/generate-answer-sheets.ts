/**
 * Genera PDFs de hoja de respuestas estilo examen físico (óvalos A–D).
 * Uso: npm run generate:answer-sheets
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PDFDocument, StandardFonts, rgb, type PDFPage } from 'pdf-lib';
import { ANSWER_SHEET_TEMPLATES, type AnswerSheetTemplate } from '../src/data/answer-sheets';

const OUT_DIR = resolve(process.cwd(), 'public/downloads');

function drawOval(page: PDFPage, cx: number, cy: number) {
  page.drawEllipse({
    x: cx,
    y: cy,
    xScale: 7,
    yScale: 5,
    borderColor: rgb(0.1, 0.1, 0.1),
    borderWidth: 0.6,
  });
}

function drawUnderlineField(page: PDFPage, x: number, y: number, width: number) {
  page.drawLine({
    start: { x, y },
    end: { x: x + width, y },
    thickness: 0.5,
    color: rgb(0.2, 0.2, 0.2),
  });
}

async function buildSheet(template: AnswerSheetTemplate): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const { width, height } = { width: 612, height: 792 }; // US Letter

  const page = doc.addPage([width, height]);
  const margin = 40;
  let y = height - margin;

  page.drawText('PrepMX — Hoja de respuestas de práctica', {
    x: margin,
    y,
    size: 8,
    font,
    color: rgb(0.45, 0.45, 0.45),
  });
  y -= 18;

  page.drawText(template.title, { x: margin, y, size: 16, font: fontBold });
  page.drawText(template.examName, {
    x: margin,
    y: y - 16,
    size: 9,
    font,
    color: rgb(0.25, 0.25, 0.25),
  });
  y -= 36;

  page.drawText('Nombre completo:', { x: margin, y, size: 9, font: fontBold });
  drawUnderlineField(page, margin + 88, y - 2, width - margin * 2 - 88);
  y -= 22;

  page.drawText(`${template.idLabel}:`, { x: margin, y, size: 9, font: fontBold });
  let boxX = margin + 88;
  for (let i = 0; i < template.idDigits; i++) {
    page.drawRectangle({
      x: boxX,
      y: y - 12,
      width: 18,
      height: 18,
      borderColor: rgb(0.2, 0.2, 0.2),
      borderWidth: 0.6,
    });
    boxX += 22;
  }
  y -= 34;

  const instructions =
    'Instrucciones: rellena por completo UN solo óvalo por reactivo. Usa lápiz #2. ' +
    'Borra bien si corriges. No marques fuera de los óvalos.';
  page.drawRectangle({
    x: margin,
    y: y - 28,
    width: width - margin * 2,
    height: 30,
    borderColor: rgb(0.75, 0.75, 0.75),
    borderWidth: 0.5,
    color: rgb(0.97, 0.97, 0.97),
  });
  page.drawText(instructions, {
    x: margin + 8,
    y: y - 18,
    size: 7.5,
    font,
    maxWidth: width - margin * 2 - 16,
    lineHeight: 9,
  });
  y -= 44;

  const cols = template.totalQuestions > 60 ? 4 : 2;
  const perCol = Math.ceil(template.totalQuestions / cols);
  const colWidth = (width - margin * 2) / cols;
  const rowHeight = template.totalQuestions > 60 ? 9.2 : 11.5;
  const gridTop = y;
  const optionCount = template.options.length;
  const ovalStartOffset = 22;
  const ovalGap = template.totalQuestions > 60 ? 18 : 22;

  for (let col = 0; col < cols; col++) {
    const colX = margin + col * colWidth;
    const startQ = col * perCol + 1;
    const endQ = Math.min(template.totalQuestions, (col + 1) * perCol);

    page.drawText('No.', { x: colX, y: gridTop, size: 7, font: fontBold });
    for (const opt of template.options) {
      const idx = template.options.indexOf(opt);
      page.drawText(opt, {
        x: colX + ovalStartOffset + idx * ovalGap + 4,
        y: gridTop,
        size: 7,
        font: fontBold,
      });
    }

    let rowY = gridTop - 14;
    for (let q = startQ; q <= endQ; q++) {
      page.drawText(String(q).padStart(3, ' '), {
        x: colX,
        y: rowY,
        size: 7,
        font,
      });
      for (let oi = 0; oi < optionCount; oi++) {
        drawOval(page, colX + ovalStartOffset + oi * ovalGap + 7, rowY + 3);
      }
      rowY -= rowHeight;
      if (rowY < margin + 40) break;
    }
  }

  page.drawText(
    `Total: ${template.totalQuestions} reactivos · ${template.options.join(' ')} · Documento de práctica PrepMX (no oficial).`,
    {
      x: margin,
      y: margin - 4,
      size: 7,
      font,
      color: rgb(0.5, 0.5, 0.5),
    }
  );

  page.drawText('prepmx.app', {
    x: width - margin - 52,
    y: margin - 4,
    size: 7,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });

  return doc.save();
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  for (const template of ANSWER_SHEET_TEMPLATES) {
    const bytes = await buildSheet(template);
    const outPath = resolve(OUT_DIR, template.filename);
    writeFileSync(outPath, bytes);
    console.log(`✅ ${template.filename} (${template.totalQuestions} reactivos)`);
  }

  console.log(`\n📁 Guardados en public/downloads/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
