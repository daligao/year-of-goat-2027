import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { inferZodiac, dailyCard, localDate } from '../daily-zodiac-card/engine.mjs';
const data = JSON.parse(fs.readFileSync(new URL('../daily-zodiac-card/fortunes.json', import.meta.url)));
const now = new Date(2026, 8, 20);
test('all 12 zodiac signs follow the known 2020 Rat cycle', () => {
  for (let i = 0; i < 12; i++) assert.equal(inferZodiac(2008 + i, 6, data, now).zodiac.id, data.zodiacs[i].id);
});
test('Lunar New Year boundary is month aware, using day 15', () => {
  assert.deepEqual(data.newYears[2024], [2, 10]); assert.deepEqual(data.newYears[2023], [1, 22]);
  assert.equal(inferZodiac(2024, 1, data, now).zodiac.id, 'rabbit');
  assert.equal(inferZodiac(2024, 2, data, now).zodiac.id, 'dragon');
  assert.equal(inferZodiac(2023, 1, data, now).zodiac.id, 'tiger');
  assert.equal(inferZodiac(2023, 2, data, now).zodiac.id, 'rabbit');
  assert.equal(inferZodiac(2024, 2, data, now).boundary, true);
  assert.equal(inferZodiac(2023, 1, data, now).boundary, true);
  assert.equal(inferZodiac(2023, 2, data, now).boundary, false);
});
test('rejects blank, fractional, too old, future and invalid month inputs', () => {
  for (const [year, month] of [[0, 1], [1899, 1], [2027, 1], [1990.5, 1], [1990, 0], [1990, 13], [1990, 2.5], [2026, 10], [NaN, 2]]) assert.throws(() => inferZodiac(year, month, data, now));
  assert.doesNotThrow(() => inferZodiac(1900, 1, data, now));
});
test('date uses device local calendar, including leap day', () => {
  assert.equal(localDate(new Date(2024, 1, 29, 23, 59)), '2024-02-29');
  assert.equal(localDate(new Date(2026, 11, 31, 0, 1)), '2026-12-31');
});
test('all signs: deterministic, valid fields, no duplicate readings over 730 days', () => {
  for (const zodiac of data.zodiacs) {
    const seen = new Set(); let previous;
    for (let day = 0; day < 730; day++) {
      const date = new Date(Date.UTC(2026, 0, 1 + day)).toISOString().slice(0, 10);
      const card = dailyCard(zodiac, date, data);
      assert.deepEqual(card, dailyCard(zodiac, date, data));
      const {date: omitted, ...reading} = card; const key = JSON.stringify(reading);
      assert.ok(!seen.has(key)); seen.add(key);
      if (previous) assert.notEqual(previous.number, card.number);
      for (const field of ['overall','love','work','money','color','direction','quote']) assert.equal(typeof card[field], 'string');
      assert.ok(card.number >= 1 && card.number <= 99); previous = card;
    }
  }
});
test('content library and local calendar cover documented range', () => {
  for (const key of ['overall','love','work','money','quotes']) assert.ok(data[key].length >= 24);
  for (let year = 1900; year <= 2100; year++) assert.ok(data.newYears[year]);
});
