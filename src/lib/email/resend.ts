import { Resend } from 'resend';
import { EMAIL_COLORS } from '@/lib/design-system/colors';

const FROM = process.env.RESEND_FROM_EMAIL ?? 'PrepMX <onboarding@resend.dev>';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

const conversionBtn = `display:inline-block;background:${EMAIL_COLORS.conversion};color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold`;
const trustBtn = `display:inline-block;background:${EMAIL_COLORS.trustSurface};color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold`;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

export async function sendTransactionalEmail(input: SendEmailInput): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.warn('[email] RESEND_API_KEY no configurada — correo no enviado:', input.subject);
    return false;
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: input.to,
    subject: input.subject,
    html: input.html,
  });

  if (error) {
    console.error('[email]', error);
    return false;
  }
  return true;
}

export function earlyBirdEmailHtml(name: string): string {
  const firstName = name.split(' ')[0] || 'estudiante';
  return `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
      <h1 style="font-size:20px">Hola ${firstName}, tu diagnóstico sigue esperándote</h1>
      <p>Viste tu nivel en el simulador gratis. Con el <strong>Plan Pro</strong> desbloqueas simulacros completos y repaso SM-2 para no olvidar lo que fallaste.</p>
      <p><strong>Early Bird:</strong> 15% de descuento si activas tu plan hoy.</p>
      <p><a href="${APP_URL}/precios" style="${conversionBtn}">Ver planes PrepMX</a></p>
      <p style="font-size:12px;color:#666">PrepMX — preparación UNAM, IPN y UAM</p>
    </div>
  `;
}

export function sm2ReminderEmailHtml(name: string, dueCount: number): string {
  const firstName = name.split(' ')[0] || 'estudiante';
  return `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
      <h1 style="font-size:20px">${firstName}, tienes ${dueCount} repaso${dueCount === 1 ? '' : 's'} listo${dueCount === 1 ? '' : 's'} hoy</h1>
      <p>El algoritmo SM-2 de PrepMX calculó que hoy es el mejor día para repasar esas preguntas antes de que se te olviden.</p>
      <p><a href="${APP_URL}/dashboard/estudio" style="${trustBtn}">Empezar repaso ahora</a></p>
      <p style="font-size:12px;color:#666">No pierdas tu racha — 10 minutos hoy valen más que 2 horas el día antes del examen.</p>
    </div>
  `;
}

export interface Sm2MorningDigestEmailInput {
  name: string;
  dueToday: number;
  headlineMateria: string | null;
  headlineTema: string | null;
  headlineDueCount: number;
  recentMissTema: string | null;
  daysUntilExam: number | null;
  topicsByMateria: Array<{ materia: string; tema: string; dueCount: number }>;
}

function formatTemaWithArticle(tema: string): string {
  const trimmed = tema.trim();
  if (!trimmed) return 'ese tema';
  const first = trimmed.charAt(0).toLowerCase();
  if ('aeiouáéíóú'.includes(first)) return `el tema de ${trimmed}`;
  return trimmed;
}

export function sm2MorningDigestSubject(input: Sm2MorningDigestEmailInput): string {
  const tema = input.recentMissTema ?? input.headlineTema;
  if (tema) {
    return `Repasa ${tema} antes de que se te olvide · PrepMX`;
  }
  return `Tienes ${input.dueToday} repaso${input.dueToday === 1 ? '' : 's'} SM-2 hoy · PrepMX`;
}

export function sm2MorningDigestEmailHtml(input: Sm2MorningDigestEmailInput): string {
  const firstName = input.name.split(' ')[0] || 'estudiante';
  const tema = input.recentMissTema ?? input.headlineTema;
  const materia = input.headlineMateria;
  const ctaUrl = `${APP_URL}/dashboard/herramientas/rafaga`;

  let hook = '';
  if (input.recentMissTema) {
    hook = `Ayer fallaste en <strong>${input.recentMissTema}</strong>.`;
  } else if (tema) {
    hook = `Tu cerebro ya empezó a olvidar <strong>${formatTemaWithArticle(tema)}</strong>.`;
  } else {
    hook = `Tienes <strong>${input.dueToday}</strong> concepto${input.dueToday === 1 ? '' : 's'} listo${input.dueToday === 1 ? '' : 's'} para repasar hoy.`;
  }

  let urgency = '';
  if (input.daysUntilExam != null && input.daysUntilExam >= 0) {
    const daysLabel =
      input.daysUntilExam === 0
        ? 'hoy'
        : input.daysUntilExam === 1
          ? 'mañana'
          : `en ${input.daysUntilExam} días`;
    urgency = ` El examen es ${daysLabel} y cada día sin repaso cuenta.`;
  } else if (materia && input.headlineDueCount > 0) {
    urgency = ` Tienes ${input.headlineDueCount} concepto${input.headlineDueCount === 1 ? '' : 's'} de ${materia} en riesgo de olvido.`;
  }

  const topTopics = input.topicsByMateria
    .slice(0, 3)
    .map((t) => `· ${t.materia}: ${t.tema} (${t.dueCount})`)
    .join('<br/>');

  return `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#111">
      <p style="font-size:13px;color:#666;margin:0 0 8px">Buenos días, ${firstName}</p>
      <h1 style="font-size:20px;line-height:1.35;margin:0 0 16px">${hook}${urgency}</h1>
      <p style="line-height:1.55;margin:0 0 16px">
        Toma <strong>3 minutos</strong> para fijarlo con Ráfaga antes de que inicies tus clases.
        PrepMX ya programó el repaso con SM-2 según lo que más necesitas.
      </p>
      ${
        topTopics
          ? `<p style="font-size:14px;line-height:1.6;background:#f4f7fa;border-radius:8px;padding:12px 14px;margin:0 0 20px">${topTopics}</p>`
          : ''
      }
      <p style="margin:0 0 20px">
        <a href="${ctaUrl}" style="${trustBtn}">
          Repasar ahora (3 min)
        </a>
      </p>
      <p style="font-size:12px;color:#666;margin:0">
        ${input.dueToday} repaso${input.dueToday === 1 ? '' : 's'} pendiente${input.dueToday === 1 ? '' : 's'} hoy · PrepMX
      </p>
    </div>
  `;
}

export function examCompletedEmailHtml(
  name: string,
  result: { score: number; total: number; percentage: number },
  recommendationsText: string
): string {
  const firstName = name.split(' ')[0] || 'estudiante';
  return `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
      <h1 style="font-size:20px">¡Buen trabajo, ${firstName}!</h1>
      <p>Tu simulacro quedó guardado: <strong>${result.score}/${result.total}</strong> aciertos (${result.percentage}%).</p>
      <p>Ya programamos tus repasos con <strong>SM-2</strong> según lo que fallaste.</p>
      <h2 style="font-size:16px;margin-top:20px">Enfócate en:</h2>
      <p style="white-space:pre-line;line-height:1.5">${recommendationsText}</p>
      <p><a href="${APP_URL}/dashboard/diagnostico" style="${trustBtn};margin-top:12px">Ver mi diagnóstico</a></p>
      <p style="font-size:12px;color:#666">PrepMX — preparación UNAM, IPN y UAM</p>
    </div>
  `;
}
