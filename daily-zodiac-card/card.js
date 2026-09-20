import { THEMES, localDate, inferZodiac, dailyCard } from './engine.mjs';
import { renderCard } from './render.mjs';
const $ = id => document.getElementById(id);
const url = 'https://chinesefortunetools.online/daily-zodiac-card/';
let data, card, zodiac, theme = 'red-gold', blobPromise;
const canvas = $('fortune-canvas');
$('birth-year').max = Math.min(2100, new Date().getFullYear());
// No form submission, URL parameters, cookies, localStorage, or birth-data requests.
function track(action) {
  if (!zodiac || !THEMES.includes(theme)) return;
  if (typeof window.ga === 'function') window.ga(`daily_zodiac_${action}`, { zodiac: zodiac.id, theme });
}
function draw() {
  card = dailyCard(zodiac, localDate(), data);
  renderCard(canvas, card, theme);
  canvas.hidden = false; $('card-placeholder').hidden = true;
  $('reading-details').hidden = false;
  const transcript = $('card-transcript'); transcript.replaceChildren();
  for (const [label, value] of [['Card', `${card.zodiac.name}, ${card.date}`], ['Overall fortune', card.overall], ['Love', card.love], ['Work', card.work], ['Money', card.money], ['Lucky color', card.color], ['Lucky number', card.number], ['Lucky direction', card.direction], ["Today's thought", card.quote]]) {
    const paragraph = document.createElement('p'); const heading = document.createElement('strong');
    heading.textContent = `${label}: `; paragraph.append(heading, String(value)); transcript.appendChild(paragraph);
  }
  canvas.setAttribute('aria-label', `${zodiac.name} daily fortune card for ${card.date}, ${theme} theme. Full reading follows.`);
  // Prepare the PNG ahead of the tap to preserve native-share user activation.
  $('download').disabled = true; $('share').disabled = true;
  const pending = new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  blobPromise = pending;
  pending.then(blob => {
    if (blobPromise !== pending) return;
    $('download').disabled = !blob; $('share').disabled = !blob;
    $('action-status').textContent = blob ? 'Your free 1080 × 1350 PNG is ready. Birth details are not included.' : 'Image export is unavailable in this browser. Try another browser.';
  });
}
function refreshDate() {
  if (card && card.date !== localDate()) { draw(); return true; }
  return false;
}
$('generate').addEventListener('click', () => {
  $('input-error').textContent = '';
  try {
    const result = inferZodiac(Number($('birth-year').value), Number($('birth-month').value), data);
    zodiac = result.zodiac;
    $('sign-note').textContent = `Your estimated zodiac: ${zodiac.name}. ${result.boundary ? 'Your birth month includes Lunar New Year. The missing day can change your sign; this estimate uses the 15th.' : 'Estimated using the Lunar New Year boundary.'}`;
    draw(); track('generate');
  } catch (error) { $('input-error').textContent = error.message; }
});
for (const input of document.querySelectorAll('input[name="card-theme"]')) {
  input.addEventListener('change', () => { theme = input.value; if (zodiac) draw(); });
}
function filename() { return `daily-zodiac-${zodiac.id}-${card.date}-${theme}.png`; }
async function download() {
  const blob = await blobPromise;
  if (!blob) throw new Error('Image export unavailable. Please try again.');
  const objectURL = URL.createObjectURL(blob); const link = document.createElement('a');
  link.href = objectURL; link.download = filename(); document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(objectURL), 60000);
  track('download'); $('action-status').textContent = 'PNG download started. Share the saved image in your favorite app.';
}
$('download').addEventListener('click', async () => { try { refreshDate(); await download(); } catch (error) { $('action-status').textContent = error.message; } });
$('share').addEventListener('click', async () => {
  try {
    // A rollover needs a new render; ask for a fresh tap rather than lose activation.
    if (refreshDate()) { $('action-status').textContent = 'A new day, a new card! Tap Share card again when the image is ready.'; return; }
    const blob = await blobPromise;
    if (!blob) throw new Error('Image export unavailable. Please try again.');
    const file = new File([blob], filename(), { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
      await navigator.share({ files: [file], title: 'Daily Chinese Zodiac Fortune Card', text: `My ${zodiac.name} card for ${card.date}. For entertainment and cultural interest. ${url}` });
      track('share'); $('action-status').textContent = 'Card shared.';
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url); track('share');
      $('action-status').textContent = 'Tool link copied. Use Download PNG to share your actual card image.';
    } else {
      await download();
      $('action-status').textContent = 'Native sharing is unavailable. PNG download started; share the saved image.';
    }
  } catch (error) {
    $('action-status').textContent = error.name === 'AbortError' ? 'Sharing canceled. Your card is still ready.' : 'Sharing is unavailable. Use Download PNG to save and share your card.';
  }
});
// Re-evaluate after sleep/backgrounding as well as while the tab stays open.
setInterval(refreshDate, 15000);
window.addEventListener('focus', refreshDate);
document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshDate(); });
window.addEventListener('pagehide', () => { $('birth-year').value = ''; $('birth-month').value = ''; });
try {
  const response = await fetch('/daily-zodiac-card/fortunes.json', { credentials: 'omit' });
  if (!response.ok) throw new Error('Local data unavailable');
  data = await response.json(); $('generate').disabled = false;
  $('action-status').textContent = 'A new card every day. No birth details appear on the image.';
} catch {
  $('action-status').textContent = 'The local card collection could not load. Reload the page to try again.';
}
