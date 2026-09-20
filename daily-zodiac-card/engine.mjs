export const THEMES = ['red-gold', 'paper-cut', 'ink'];
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function inferZodiac(year, month, data, now = new Date()) {
  if (!Number.isInteger(year) || year < 1900 || year > now.getFullYear() ||
      !Number.isInteger(month) || month < 1 || month > 12 ||
      (year === now.getFullYear() && month > now.getMonth() + 1) || !data.newYears[year]) {
    throw new Error('Enter a valid birth year from 1900 to today and select a birth month.');
  }
  const [newYearMonth, newYearDay] = data.newYears[year];
  const previous = month < newYearMonth || (month === newYearMonth && 15 < newYearDay);
  const index = ((year - (previous ? 1 : 0) - 4) % 12 + 12) % 12;
  return { zodiac: data.zodiacs[index], boundary: month === newYearMonth };
}
function hash(text) {
  let value = 2166136261;
  for (const char of text) { value = Math.imul(value ^ char.charCodeAt(0), 16777619); }
  return value >>> 0;
}
export function dailyCard(zodiac, date, data) {
  const index = data.zodiacs.findIndex(item => item.id === zodiac.id);
  if (index < 0 || !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Invalid card seed.');
  const day = Math.floor(Date.parse(`${date}T00:00:00Z`) / 86400000);
  const pick = (key) => data[key][hash(`${date}|${zodiac.id}|${key}|v1`) % data[key].length];
  return { zodiac, date, overall: pick('overall'), love: pick('love'), work: pick('work'), money: pick('money'),
    color: pick('colors'), number: ((day + index * 7) % 99 + 99) % 99 + 1,
    direction: pick('directions'), quote: pick('quotes') };
}
