import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = 'publicado';

function leaf(id, codigo, titulo, descripcion, orden) {
  return { id, codigo, titulo, descripcion, orden, status: pub };
}
function branch(id, codigo, titulo, orden, children, extra = {}) {
  return { id, codigo, titulo, orden, status: pub, children, ...extra };
}

const topics = [
  branch('fis-cinematica', '1', 'Cinemática', 1, [
    branch('fis-cinematica-1-1', '1.1', 'Conceptos básicos del movimiento', 1, [
      leaf('fis-cinematica-1-1-1', '1.1.1', 'Sistemas de referencia', 'Definición de observador, sistemas de referencia absolutos y relativos.', 1),
      leaf('fis-cinematica-1-1-2', '1.1.2', 'Magnitudes escalares y vectoriales', 'Diferencia entre distancia (escalar) y desplazamiento (vectorial); diferencia entre rapidez (escalar) y velocidad (vectorial).', 2),
      leaf('fis-cinematica-1-1-3', '1.1.3', 'Variables cinemáticas', 'Definición de posición, trayectoria, tiempo y aceleración (cambio de velocidad por unidad de tiempo).', 3),
    ]),
    branch('fis-cinematica-1-2', '1.2', 'Movimiento Rectilíneo Uniforme (MRU)', 2, [
      leaf('fis-cinematica-1-2-1', '1.2.1', 'Características fundamentales', 'Velocidad constante en magnitud, dirección y sentido; aceleración igual a cero; trayectorias en línea recta.', 1),
      leaf('fis-cinematica-1-2-2', '1.2.2', 'Ecuación matemática', 'Uso y despejes de v = d/t (d = v·t; t = d/v). Problemas de trenes o móviles que se encuentran o se alejan.', 2),
      leaf('fis-cinematica-1-2-3', '1.2.3', 'Análisis gráfico del MRU', 'Gráfica Posición vs. Tiempo (x-t): línea recta diagonal cuya pendiente representa la velocidad. Gráfica Velocidad vs. Tiempo (v-t): línea recta horizontal donde el área bajo la curva representa la distancia recorrida.', 3),
    ]),
    branch('fis-cinematica-1-3', '1.3', 'Movimiento Rectilíneo Uniformemente Acelerado (MRUA)', 3, [
      leaf('fis-cinematica-1-3-1', '1.3.1', 'Características fundamentales', 'Aceleración constante diferente de cero; cambios de velocidad uniformes en intervalos de tiempo iguales.', 1),
      leaf('fis-cinematica-1-3-2', '1.3.2', 'Ecuaciones del cinemática lineal', 'a = (v_f − v_i)/t; v_f = v_i + a·t; d = v_i·t + (a·t²)/2; v_f² = v_i² + 2a·d; d = ((v_i + v_f)/2)·t.', 2),
      leaf('fis-cinematica-1-3-3', '1.3.3', 'Casos operativos', 'Problemas de frenado (aceleración negativa), autos que arrancan del reposo (v_i = 0) y rebasamiento.', 3),
      leaf('fis-cinematica-1-3-4', '1.3.4', 'Análisis gráfico del MRUA', 'Gráfica Posición vs. Tiempo (x-t): curva parabólica. Gráfica Velocidad vs. Tiempo (v-t): línea recta diagonal cuya pendiente es la aceleración. Gráfica Aceleración vs. Tiempo (a-t): línea recta horizontal.', 4),
    ]),
    branch('fis-cinematica-1-4', '1.4', 'Caída Libre y Tiro Vertical', 4, [
      leaf('fis-cinematica-1-4-1', '1.4.1', 'Caída Libre', 'Condiciones ideales: sin resistencia del aire, objeto que se suelta desde una altura h (v_i = 0). Ecuaciones con g ≈ 9.8 m/s² (o 10 m/s² en examen): v_f = g·t; h = (g·t²)/2; v_f² = 2g·h.', 1),
      leaf('fis-cinematica-1-4-2', '1.4.2', 'Tiro Vertical', 'El objeto se lanza hacia arriba con velocidad inicial (v_i > 0). La gravedad actúa como desaceleración al subir. En la altura máxima la velocidad instantánea es cero (v_f = 0). El tiempo de subida es idéntico al de bajada. h_máx = v_i²/(2g); t_s = v_i/g.', 2),
    ]),
  ], { guideSlug: 'fisica' }),
  branch('fis-newton', '2', 'Fuerzas, Leyes de Newton y Ley de la Gravitación Universal', 2, [
    branch('fis-newton-2-1', '2.1', 'Concepto de Fuerza y Vectores', 1, [
      leaf('fis-newton-2-1-1', '2.1.1', 'Definición de fuerza', 'Interacción entre dos cuerpos capaz de modificar el estado de reposo, de movimiento o producir una deformación. Unidad en el SI: el Newton (N = kg·m/s²).', 1),
      leaf('fis-newton-2-1-2', '2.1.2', 'Carácter vectorial', 'Suma de fuerzas concurrentes mediante descomposición analítica en componentes rectangulares (F_x = F·cos θ; F_y = F·sen θ) y cálculo de la fuerza resultante (F_R = √(F_x² + F_y²)).', 2),
    ]),
    branch('fis-newton-2-2', '2.2', 'Leyes de la Dinámica (Leyes de Newton)', 2, [
      leaf('fis-newton-2-2-1', '2.2.1', 'Primera Ley de Newton (Ley de la Inercia)', 'Todo cuerpo permanece en su estado de reposo o de movimiento rectilíneo uniforme a menos que una fuerza externa neta actúe sobre él. Concepto de inercia y su relación directa con la masa.', 1),
      leaf('fis-newton-2-2-2', '2.2.2', 'Segunda Ley de Newton', 'La aceleración de un cuerpo es directamente proporcional a la fuerza neta que actúa sobre él e inversamente proporcional a su masa. Ecuación: F = m·a. Problemas típicos: cálculo de la fuerza para acelerar bloques y masas en planos horizontales lisos.', 2),
      leaf('fis-newton-2-2-3', '2.2.3', 'Tercera Ley de Newton', 'A toda fuerza de acción le corresponde una fuerza de reacción de igual magnitud y dirección, pero en sentido opuesto, actuando en cuerpos diferentes (nunca se anulan entre sí).', 3),
    ]),
    branch('fis-newton-2-3', '2.3', 'Estática y Equilibrio', 3, [
      leaf('fis-newton-2-3-1', '2.3.1', 'Primera condición de equilibrio (traslacional)', 'La suma vectorial de todas las fuerzas que actúan sobre un cuerpo debe ser cero (∑F_x = 0; ∑F_y = 0).', 1),
      leaf('fis-newton-2-3-2', '2.3.2', 'Segunda condición de equilibrio (rotacional)', 'La suma de los momentos o torques respecto a cualquier punto debe ser cero (∑τ = 0). Torque: τ = F·d·sen θ (fuerza por brazo de palanca). Convención: antihorario (+), horario (−). Problemas: palancas, balancines, vigas apoyadas.', 2),
    ]),
    branch('fis-newton-2-4', '2.4', 'Ley de la Gravitación Universal', 4, [
      leaf('fis-newton-2-4-1', '2.4.1', 'Enunciado', 'La fuerza de atracción entre dos cuerpos es directamente proporcional al producto de sus masas e inversamente proporcional al cuadrado de la distancia que los separa.', 1),
      leaf('fis-newton-2-4-2', '2.4.2', 'Ecuación', 'F = G·(m₁·m₂)/d², donde G es la constante de gravitación universal (6.67 × 10⁻¹¹ N·m²/kg²).', 2),
      leaf('fis-newton-2-4-3', '2.4.3', 'Variaciones proporcionales (pregunta clásica UNAM)', 'Qué pasa con la fuerza si una masa se duplica, o si la distancia se reduce a la mitad (relación inversa del cuadrado).', 3),
      leaf('fis-newton-2-4-4', '2.4.4', 'Distinción entre Masa y Peso', 'Masa como cantidad de materia (constante en el universo); peso como fuerza gravitacional dependiente del lugar (P = m·g).', 4),
    ]),
  ]),
  branch('fis-energia', '3', 'Trabajo, Potencia y Energía', 3, [
    branch('fis-energia-3-1', '3.1', 'Trabajo Mecánico (W)', 1, [
      leaf('fis-energia-3-1-1', '3.1.1', 'Definición', 'Producto de la componente de la fuerza en la dirección del movimiento por el desplazamiento del cuerpo. Unidad en el SI: Joule (J = N·m).', 1),
      leaf('fis-energia-3-1-2', '3.1.2', 'Ecuación', 'W = F·d·cos θ.', 2),
      leaf('fis-energia-3-1-3', '3.1.3', 'Casos particulares', 'Trabajo máximo (θ = 0°), trabajo nulo (θ = 90°, fuerzas perpendiculares al movimiento como la normal), y trabajo negativo (θ = 180°, fuerza de fricción).', 3),
    ]),
    branch('fis-energia-3-2', '3.2', 'Potencia Mecánica (P)', 2, [
      leaf('fis-energia-3-2-1', '3.2.1', 'Definición', 'Rapidez con la que se realiza un trabajo mecánico. Unidad en el SI: Watt (W = J/s). Otras unidades: caballo de fuerza (HP ≈ 746 W).', 1),
      leaf('fis-energia-3-2-2', '3.2.2', 'Ecuaciones', 'P = W/t y su equivalencia con velocidad constante P = F·v.', 2),
    ]),
    branch('fis-energia-3-3', '3.3', 'Energía Mecánica y su Conservación', 3, [
      leaf('fis-energia-3-3-1', '3.3.1', 'Energía Cinética (E_c)', 'Energía asociada al estado de movimiento de un cuerpo. Fórmula: E_c = ½·m·v².', 1),
      leaf('fis-energia-3-3-2', '3.3.2', 'Energía Potencial Gravitatoria (E_p)', 'Energía almacenada en virtud de la posición respecto a una altura de referencia. Fórmula: E_p = m·g·h.', 2),
      leaf('fis-energia-3-3-3', '3.3.3', 'Ley de la Conservación de la Energía Mecánica', 'En ausencia de fricción (sistemas conservativos), la energía mecánica total se mantiene constante (E_M1 = E_M2 → E_c1 + E_p1 = E_c2 + E_p2).', 3),
      leaf('fis-energia-3-3-4', '3.3.4', 'Teorema del Trabajo y la Energía', 'El trabajo neto realizado sobre un objeto es igual al cambio en su energía cinética (W_neto = ΔE_c = E_cf − E_ci).', 4),
    ]),
  ]),
  branch('fis-fluidos', '4', 'Mecánica de Fluidos', 4, [
    branch('fis-fluidos-4-1', '4.1', 'Propiedades de los fluidos', 1, [
      leaf('fis-fluidos-4-1-1', '4.1.1', 'Densidad (ρ)', 'Masa por unidad de volumen (ρ = m/V).', 1),
      leaf('fis-fluidos-4-1-2', '4.1.2', 'Peso específico (γ)', 'Peso de una sustancia por unidad de volumen (γ = P/V = ρ·g).', 2),
      leaf('fis-fluidos-4-1-3', '4.1.3', 'Presión (P)', 'Fuerza normal ejercida por unidad de área (P = F/A). Unidad en el SI: Pascal (Pa = N/m²).', 3),
    ]),
    branch('fis-fluidos-4-2', '4.2', 'Hidrostática (fluidos en reposo)', 2, [
      leaf('fis-fluidos-4-2-1', '4.2.1', 'Presión Hidrostática', 'Presión ejercida por el peso de una columna de fluido. Fórmula: P_h = ρ·g·h. A mayor profundidad, mayor presión.', 1),
      leaf('fis-fluidos-4-2-2', '4.2.2', 'Presión Atmosférica y Absoluta', 'Presión de la capa de aire terrestre (Torricelli: 1 atm ≈ 760 mmHg ≈ 1.013 × 10⁵ Pa). Presión absoluta: P_abs = P_atm + P_h.', 2),
      leaf('fis-fluidos-4-2-3', '4.2.3', 'Principio de Pascal', 'Toda presión ejercida sobre un fluido encerrado se transmite íntegramente a todas las direcciones y a las paredes del recipiente. Prensa hidráulica: f/a = F/A (multiplicación de fuerzas con distintas áreas de émbolos).', 3),
      leaf('fis-fluidos-4-2-4', '4.2.4', 'Principio de Arquímedes', 'Todo cuerpo sumergido experimenta un empuje vertical hacia arriba igual al peso del volumen de fluido desalojado. E = ρ_fluido·g·V_sumergido. Flotación: E > P flota; E = P equilibrio; E < P se hunde.', 4),
    ]),
    branch('fis-fluidos-4-3', '4.3', 'Hidrodinámica (fluidos en movimiento — básico)', 3, [
      leaf('fis-fluidos-4-3-1', '4.3.1', 'Gasto o Caudal (G o Q)', 'Volumen de fluido que pasa por una sección transversal por unidad de tiempo (G = V/t = A·v, donde A es el área y v la velocidad).', 1),
      leaf('fis-fluidos-4-3-2', '4.3.2', 'Ecuación de Continuidad', 'Para un fluido incompresible, el gasto es constante a lo largo del conducto (A₁·v₁ = A₂·v₂). Si el área se reduce, la velocidad del fluido aumenta.', 2),
    ]),
  ]),
  branch('fis-termo', '5', 'Termodinámica', 5, [
    branch('fis-termo-5-1', '5.1', 'Temperatura y Escalas Termométricas', 1, [
      leaf('fis-termo-5-1-1', '5.1.1', 'Definición', 'Medida de la energía cinética promedio de las partículas de un cuerpo.', 1),
      leaf('fis-termo-5-1-2', '5.1.2', 'Fórmulas de conversión', 'De Celsius a Kelvin: T_K = T_C + 273.15. De Celsius a Fahrenheit: T_F = 1.8(T_C) + 32. De Fahrenheit a Celsius: T_C = (T_F − 32)/1.8.', 2),
    ]),
    branch('fis-termo-5-2', '5.2', 'Calor y Transferencia Térmica', 2, [
      leaf('fis-termo-5-2-1', '5.2.1', 'Definición de Calor (Q)', 'Energía en tránsito debido a una diferencia de temperaturas. Unidades: caloría (cal), Joule (J). Equivalencia: 1 cal ≈ 4.186 J.', 1),
      leaf('fis-termo-5-2-2', '5.2.2', 'Mecanismos de propagación', 'Conducción (contacto directo en sólidos), convección (movimiento de masas de fluidos en líquidos/gases), radiación (ondas electromagnéticas, no requiere medio material).', 2),
    ]),
    branch('fis-termo-5-3', '5.3', 'Calorimetría', 3, [
      leaf('fis-termo-5-3-1', '5.3.1', 'Calor específico (c)', 'Cantidad de calor requerida para elevar un grado de temperatura una unidad de masa de una sustancia.', 1),
      leaf('fis-termo-5-3-2', '5.3.2', 'Ecuación del calor sensible', 'Q = m·c·ΔT = m·c·(T_f − T_i).', 2),
      leaf('fis-termo-5-3-3', '5.3.3', 'Equilibrio térmico', 'En un sistema aislado, el calor ganado por los cuerpos fríos es igual al calor perdido por los cuerpos calientes (Q_ganado = −Q_perdido).', 3),
      leaf('fis-termo-5-3-4', '5.3.4', 'Cambios de fase y Calor latente (L)', 'Calor absorbido o cedido durante un cambio de estado físico sin alteración de temperatura (Q = m·L_f para fusión o Q = m·L_v para vaporización).', 4),
    ]),
    branch('fis-termo-5-4', '5.4', 'Leyes de la Termodinámica', 4, [
      leaf('fis-termo-5-4-1', '5.4.1', 'Ley Cero', 'Si dos sistemas están en equilibrio térmico con un tercer sistema de forma independiente, están en equilibrio térmico entre sí (base del termómetro).', 1),
      leaf('fis-termo-5-4-2', '5.4.2', 'Primera Ley (Conservación de la energía)', 'El cambio en la energía interna de un sistema es igual al calor neto transferido al sistema menos el trabajo realizado por el mismo. Ecuación: ΔU = Q − W (cuidado con la convención de signos de la guía UNAM).', 2),
      leaf('fis-termo-5-4-3', '5.4.3', 'Segunda Ley', 'El calor fluye espontáneamente de un cuerpo de mayor temperatura a uno de menor temperatura, nunca a la inversa. Introduce entropía (desorden del universo) y postula que ninguna máquina térmica puede tener eficiencia del 100%.', 3),
    ]),
  ]),
  branch('fis-ondas', '6', 'Ondas y Acústica', 6, [
    branch('fis-ondas-6-1', '6.1', 'Características fundamentales de las ondas', 1, [
      leaf('fis-ondas-6-1-1', '6.1.1', 'Clasificación por el medio de propagación', 'Ondas mecánicas (requieren medio elástico como el sonido o cuerdas) y ondas electromagnéticas (se propagan en el vacío como la luz).', 1),
      leaf('fis-ondas-6-1-2', '6.1.2', 'Clasificación por la dirección de la vibración', 'Ondas transversales (partículas vibran perpendicularmente a la propagación) y longitudinales (vibran en la misma dirección).', 2),
      leaf('fis-ondas-6-1-3', '6.1.3', 'Anatomía y parámetros de una onda', 'Cresta (punto más alto), valle (punto más bajo), amplitud (máximo desplazamiento), periodo (T: tiempo en completar un ciclo), frecuencia (f = 1/T: ciclos por segundo o Hertz, Hz), longitud de onda (λ: distancia entre dos crestas consecutivas).', 3),
      leaf('fis-ondas-6-1-4', '6.1.4', 'Ecuación de velocidad de propagación', 'v = λ/T = λ·f.', 4),
    ]),
    branch('fis-ondas-6-2', '6.2', 'Fenómenos ondulatorios', 2, [
      leaf('fis-ondas-6-2-1', '6.2.1', 'Reflexión', 'Choque contra un obstáculo y regreso al medio de origen.', 1),
      leaf('fis-ondas-6-2-2', '6.2.2', 'Refracción', 'Cambio de dirección y velocidad al pasar de un medio a otro.', 2),
      leaf('fis-ondas-6-2-3', '6.2.3', 'Difracción', 'Propiedad de rodear obstáculos o pasar por rendijas.', 3),
      leaf('fis-ondas-6-2-4', '6.2.4', 'Interferencia', 'Superposición de ondas (constructiva si se suman amplitudes, destructiva si se restan).', 4),
      leaf('fis-ondas-6-2-5', '6.2.5', 'Efecto Doppler', 'Cambio aparente en la frecuencia de una onda debido al movimiento relativo entre la fuente emisora y el observador (ej. la sirena de una ambulancia).', 5),
    ]),
  ]),
  branch('fis-electro', '7', 'Electromagnetismo', 7, [
    branch('fis-electro-7-1', '7.1', 'Electrostática', 1, [
      leaf('fis-electro-7-1-1', '7.1.1', 'Carga eléctrica', 'Propiedad intrínseca de la materia. Ley de conservación de la carga y cuantización (q = n·e). Ley de los signos: cargas iguales se repelen, opuestas se atraen.', 1),
      leaf('fis-electro-7-1-2', '7.1.2', 'Ley de Coulomb', 'La fuerza entre dos cargas puntuales en reposo es directamente proporcional al producto de las cargas e inversamente proporcional al cuadrado de la distancia. F = k·(q₁·q₂)/d², con k ≈ 9 × 10⁹ N·m²/C² en el vacío.', 2),
      leaf('fis-electro-7-1-3', '7.1.3', 'Campo Eléctrico (E⃗)', 'Región del espacio que rodea a una carga donde se manifiestan fuerzas eléctricas. E = F/q y E = k·Q/d². Dirección: sale de cargas positivas y entra en las negativas.', 3),
    ]),
    branch('fis-electro-7-2', '7.2', 'Electrodinámica y Circuitos Eléctricos', 2, [
      leaf('fis-electro-7-2-1', '7.2.1', 'Corriente eléctrica (I)', 'Flujo ordenado de electrones a través de un conductor por unidad de tiempo (I = q/t). Unidad: Ampere (A).', 1),
      leaf('fis-electro-7-2-2', '7.2.2', 'Ley de Ohm', 'La intensidad de corriente es directamente proporcional al voltaje aplicado e inversamente proporcional a la resistencia. I = V/R (o V = I·R). Unidad de resistencia: Ohm (Ω).', 2),
      leaf('fis-electro-7-2-3', '7.2.3', 'Circuitos de Resistencias', 'En serie: corriente constante (I_t = I₁ = I₂ = …), voltaje se suma (V_t = V₁ + V₂ + …), R_eq = R₁ + R₂ + R₃ + …. En paralelo: voltaje constante, corriente se divide, 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃ + ….', 3),
      leaf('fis-electro-7-2-4', '7.2.4', 'Potencia Eléctrica', 'Energía disipada o consumida por unidad de tiempo. P = V·I = I²·R = V²/R (Ley de Joule).', 4),
    ]),
    branch('fis-electro-7-3', '7.3', 'Magnetismo y Electromagnetismo', 3, [
      leaf('fis-electro-7-3-1', '7.3.1', 'Campos magnéticos', 'Propiedades de los imanes (polos norte y sur inseparables).', 1),
      leaf('fis-electro-7-3-2', '7.3.2', 'Experimento de Oersted', 'Descubrimiento de que una corriente eléctrica genera un campo magnético a su alrededor.', 2),
      leaf('fis-electro-7-3-3', '7.3.3', 'Inducción Electromagnética (Ley de Faraday)', 'Un campo magnético variable en el tiempo a través de una espira induce una fuerza electromotriz (voltaje) y, por ende, una corriente eléctrica inducida (principio de motores y generadores eléctricos).', 3),
    ]),
  ]),
  branch('fis-optica', '8', 'Óptica', 8, [
    branch('fis-optica-8-1', '8.1', 'Naturaleza de la luz', 1, [
      leaf('fis-optica-8-1-1', '8.1.1', 'Modelo Dual', 'Comportamiento ondulatorio (propagación, interferencia) y corpuscular (efecto fotoeléctrico, fotones). Velocidad en el vacío: c ≈ 3 × 10⁸ m/s.', 1),
    ]),
    branch('fis-optica-8-2', '8.2', 'Óptica Geométrica', 2, [
      leaf('fis-optica-8-2-1', '8.2.1', 'Reflexión de la luz', 'Ley de la reflexión: el ángulo de incidencia es igual al ángulo de reflexión respecto a la línea normal.', 1),
      leaf('fis-optica-8-2-2', '8.2.2', 'Refracción e Índice de refracción (n)', 'Relación entre la velocidad de la luz en el vacío y en un medio material (n = c/v). Ley de Snell: n₁·sen θ₁ = n₂·sen θ₂.', 2),
      leaf('fis-optica-8-2-3', '8.2.3', 'Espejos y Lentes', 'Espejos (reflejan la luz): planos (imágenes virtuales y simétricas) y esféricos (cóncavos y convexos). Lentes (refractan la luz): convergentes (lupas, hipermetropía) y divergentes (miopía).', 3),
    ]),
  ]),
  branch('fis-contemp', '9', 'Física Contemporánea (Básica)', 9, [
    branch('fis-contemp-9-1', '9.1', 'Estructura atómica y radiación', 1, [
      leaf('fis-contemp-9-1-1', '9.1.1', 'El fotón', 'El cuanto de energía electromagnética (E = h·f, donde h es la constante de Planck).', 1),
      leaf('fis-contemp-9-1-2', '9.1.2', 'Radiactividad nuclear', 'Emisiones Alfa (α), Beta (β) y Gamma (γ). Procesos fundamentales de fisión (ruptura de núcleos pesados) y fusión nuclear (unión de núcleos ligeros como en las estrellas).', 2),
    ]),
  ]),
];

function countLeaves(list) {
  let n = 0;
  for (const t of list) {
    if (t.children?.length) n += countLeaves(t.children);
    else n++;
  }
  return n;
}

const outPath = path.join(__dirname, '../src/data/unam-temario-fisica.ts');
const content = `import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Física — Examen UNAM. */
export const UNAM_FISICA_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(topics, null, 2)} as UnamTemarioTopic[];
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('Written', outPath);
console.log('Blocks:', topics.length);
console.log('Leaf count:', countLeaves(topics));
