export function normaliseDate(date: string): string {
  date.split('').splice(date.length - 2, 0, '20');

  return date;
}
