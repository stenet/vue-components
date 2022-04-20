export function getToday() {
  return getStartOfDay(new Date());
}
export function getNow() {
  return Date.now();
}

export function getStartOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(date.getDate() + days);
  return d;
}