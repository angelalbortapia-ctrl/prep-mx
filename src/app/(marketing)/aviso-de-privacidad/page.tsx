export default function AvisoPrivacidadPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 prose prose-neutral">
      <h1>Aviso de privacidad</h1>
      <p className="lead">
        En PrepMX valoramos tu confianza. Queremos ser transparentes sobre qué datos
        recopilamos, cómo los usamos y cómo los protegemos mientras te preparas para tu
        examen de admisión.
      </p>

      <h2>1. ¿Quién es el responsable de tus datos?</h2>
      <p>
        Somos PrepMX, con domicilio en <strong>[completa tu dirección fiscal]</strong>.
        Para dudas o solicitudes ARCO escríbenos a{' '}
        <a href="mailto:privacidad@prepmx.com">privacidad@prepmx.com</a>.
      </p>

      <h2>2. ¿Qué información recopilamos?</h2>
      <p>Recopilamos solo lo necesario para que la plataforma funcione:</p>
      <ul>
        <li>
          <strong>Datos de identidad:</strong> nombre y correo electrónico.
        </li>
        <li>
          <strong>Datos de aprendizaje:</strong> progreso en lecciones, simulacros
          realizados, calificaciones y temas de repaso.
        </li>
        <li>
          <strong>Datos financieros:</strong> información de pagos procesada de forma
          segura. PrepMX no almacena números completos de tarjeta; eso lo gestionan
          nuestros proveedores de pago.
        </li>
      </ul>

      <h2>3. ¿Para qué usamos tus datos?</h2>
      <ul>
        <li>Crear y administrar tu cuenta.</li>
        <li>Dar seguimiento a tu avance y personalizar tu plan de estudio.</li>
        <li>Procesar pagos de suscripciones o cursos.</li>
        <li>Enviarte notificaciones importantes sobre tu cuenta o contenido nuevo.</li>
      </ul>

      <h2>4. ¿Compartimos tus datos con terceros?</h2>
      <p>
        Utilizamos proveedores de confianza. Tus datos pueden ser tratados por:
      </p>
      <ul>
        <li>
          <strong>Clerk</strong> — inicio de sesión y seguridad de cuenta.
        </li>
        <li>
          <strong>Supabase</strong> — almacenamiento de información y progreso.
        </li>
        <li>
          <strong>Stripe</strong> — procesamiento de pagos.
        </li>
        <li>
          <strong>OpenAI</strong> — tutor y explicaciones de preguntas. Solo enviamos
          la información mínima necesaria (ID de pregunta, contexto del simulacro), nunca
          texto libre que puedas usar para hacer trampa.
        </li>
      </ul>
      <p>
        Cada proveedor cuenta con sus propios estándares de seguridad y cumplimiento de
        protección de datos.
      </p>

      <h2>5. Tus derechos ARCO</h2>
      <p>
        Puedes ejercer tus derechos de <strong>Acceso, Rectificación, Cancelación y
        Oposición</strong> escribiendo a{' '}
        <a href="mailto:privacidad@prepmx.com">privacidad@prepmx.com</a>:
      </p>
      <ul>
        <li><strong>Acceso:</strong> saber qué datos tenemos sobre ti.</li>
        <li><strong>Rectificación:</strong> corregir datos incorrectos o desactualizados.</li>
        <li><strong>Cancelación:</strong> solicitar la eliminación de tus datos.</li>
        <li><strong>Oposición:</strong> limitar el uso de tus datos para fines específicos.</li>
      </ul>
      <p>Responderemos en un máximo de 20 días hábiles.</p>

      <h2>6. ¿Cómo protegemos tu información?</h2>
      <p>
        Aplicamos medidas técnicas y administrativas para evitar accesos no autorizados
        a tu información personal.
      </p>

      <h2>7. Cambios en este aviso</h2>
      <p>
        Si hacemos cambios importantes, te notificaremos por correo o mediante un aviso
        en la plataforma.
      </p>

      <p className="text-sm text-muted-foreground">
        Última actualización: junio de 2026. Borrador orientativo — revisar con asesor
        legal antes de producción.
      </p>
    </section>
  );
}
