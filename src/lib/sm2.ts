export function calcularProximaRevision(
  calidad: 0 | 1 | 2 | 3 | 4 | 5,
  intervalo: number,
  facilidad: number
): { nuevoIntervalo: number; nuevaFacilidad: number } {
  let nuevaFacilidad = facilidad + (0.1 - (5 - calidad) * (0.08 + (5 - calidad) * 0.02));
  if (nuevaFacilidad < 1.3) nuevaFacilidad = 1.3;

  let nuevoIntervalo: number;
  if (calidad < 3) {
    nuevoIntervalo = 1;
  } else if (intervalo === 1) {
    nuevoIntervalo = 6;
  } else {
    nuevoIntervalo = Math.round(intervalo * nuevaFacilidad);
  }

  return { nuevoIntervalo, nuevaFacilidad };
}
