import Link from 'next/link';

export default function TerminosPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 prose prose-neutral">
      <h1>Términos y condiciones</h1>
      <p className="lead">
        Al usar PrepMX aceptas estas condiciones de uso del servicio educativo en línea.
        Léelas junto con nuestro{' '}
        <Link href="/aviso-de-privacidad">Aviso de Privacidad</Link>.
      </p>

      <h2>1. El servicio</h2>
      <p>
        PrepMX ofrece contenido de preparación para exámenes de admisión a universidades
        públicas en México (UNAM, IPN, UAM). El material es orientativo y no sustituye la
        convocatoria oficial de cada institución.
      </p>

      <h2>2. Tu cuenta</h2>
      <p>
        Eres responsable de la confidencialidad de tus credenciales. Debes proporcionar
        información veraz al registrarte. Nos reservamos el derecho de suspender cuentas
        con uso fraudulento o que violen estos términos.
      </p>

      <h2>3. Pagos y reembolsos</h2>
      <p>
        Los planes de pago se procesan mediante Stripe. El acceso premium se activa tras
        confirmar el pago. Las políticas de reembolso se comunicarán en la página de
        precios y pueden variar según el plan contratado.
      </p>

      <h2>4. Propiedad intelectual</h2>
      <p>
        Los reactivos, guías y diseño de la plataforma son propiedad de PrepMX o de sus
        licenciantes. No está permitida la reproducción masiva ni la reventa del
        contenido.
      </p>

      <h2>5. Limitación de responsabilidad</h2>
      <p>
        PrepMX no garantiza un resultado específico en tu examen de admisión. El servicio
        se ofrece &quot;tal cual&quot;, dentro de los límites permitidos por la ley mexicana.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Dudas sobre estos términos:{' '}
        <a href="mailto:privacidad@prepmx.com">privacidad@prepmx.com</a>.
      </p>

      <p className="text-sm text-muted-foreground">
        Última actualización: junio de 2026. Borrador orientativo — revisar con asesor
        legal antes de producción.
      </p>
    </section>
  );
}
