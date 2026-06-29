import type { AspirantChecklistData } from './aspirant-checklist';
import { formatCareerLabel } from './aspirant-checklist';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function indent(depth: number): string {
  return `${Math.min(depth, 4) * 1.25}rem`;
}

/** HTML imprimible — el alumno usa «Guardar como PDF» en el navegador. */
export function buildChecklistPrintHtml(
  data: AspirantChecklistData,
  checkedIds: Set<string>
): string {
  const title = formatCareerLabel(data.career);
  const checkedLeaves = data.materias
    .flatMap((m) => m.topics.filter((t) => t.isLeaf && checkedIds.has(t.id)))
    .length;
  const totalLeaves = data.stats.totalTopics;

  const materiasHtml = data.materias
    .map((materia) => {
      const rows = materia.topics
        .map((topic) => {
          const checked = topic.isLeaf && checkedIds.has(topic.id);
          const box = topic.isLeaf ? (checked ? '☑' : '☐') : '';
          const style = topic.isLeaf
            ? `margin-left: ${indent(topic.depth)}`
            : `margin-left: ${indent(topic.depth)}; font-weight: 600; margin-top: 0.75rem`;
          return `<li style="${style}">${box} ${topic.codigo ? `<span style="font-family: monospace; color: #666">${escapeHtml(topic.codigo)}</span> ` : ''}${escapeHtml(topic.titulo)}</li>`;
        })
        .join('\n');

      return `
        <section style="margin-bottom: 1.5rem; page-break-inside: avoid">
          <h2 style="font-size: 1.1rem; border-bottom: 2px solid #111; padding-bottom: 0.25rem">
            ${escapeHtml(materia.icon)} ${escapeHtml(materia.nombre)}
            <span style="font-weight: normal; font-size: 0.85rem; color: #555"> · ${materia.reactivosOficiales} reactivos oficiales</span>
          </h2>
          <ul style="list-style: none; padding: 0; margin: 0.5rem 0 0; line-height: 1.45">${rows}</ul>
        </section>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Checklist ${escapeHtml(title)} — PrepMX</title>
  <style>
    @page { margin: 1.5cm; }
    body { font-family: system-ui, sans-serif; color: #111; max-width: 48rem; margin: 0 auto; padding: 1rem; }
    h1 { font-size: 1.35rem; margin-bottom: 0.25rem; }
    .meta { font-size: 0.85rem; color: #444; margin-bottom: 1.25rem; }
    footer { margin-top: 2rem; font-size: 0.75rem; color: #666; border-top: 1px solid #ddd; padding-top: 0.75rem; }
  </style>
</head>
<body>
  <h1>Checklist del aspirante — ${escapeHtml(title)}</h1>
  <p class="meta">
    Convocatoria ${escapeHtml(data.convocatoria)} · ${data.totalReactivos} reactivos ·
    Progreso: ${checkedLeaves}/${totalLeaves} subtemas marcados<br />
    ${data.areaLabel ? `Énfasis: ${escapeHtml(data.areaLabel)} · ` : ''}
    Fuente: ${escapeHtml(data.fuente)}
  </p>
  ${materiasHtml}
  <footer>
    Generado en PrepMX · prepmx.com — Mide tu nivel con el diagnóstico gratis de 10 preguntas.
  </footer>
  <script>window.onload = () => window.print()</script>
</body>
</html>`;
}

export function downloadChecklistDocument(
  data: AspirantChecklistData,
  checkedIds: Set<string>
): void {
  const html = buildChecklistPrintHtml(data, checkedIds);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const slug = data.career.id.replace(/[^a-z0-9-]/gi, '-');
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `checklist-prepmx-${slug}.html`;
    a.click();
  }
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
