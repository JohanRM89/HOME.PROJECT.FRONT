export function formatDateEs(date?: string | null) {
  if (!date) return "Sin fecha";

  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
