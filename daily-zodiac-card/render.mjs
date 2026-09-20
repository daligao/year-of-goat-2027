export const PALETTES = {
  'red-gold': { bg: '#711e2b', text: '#fff2d7', accent: '#e8c881', muted: '#e9c9be', panel: '#812b37' },
  'paper-cut': { bg: '#fff3df', text: '#822a2c', accent: '#b32b32', muted: '#8a4d42', panel: '#f5e5cf' },
  ink: { bg: '#efeee6', text: '#253c39', accent: '#526e62', muted: '#53625c', panel: '#e3e5dc' }
};
export function renderCard(canvas, card, theme) {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Your browser cannot draw a card. Please try another browser.');
  const p = PALETTES[theme];
  canvas.width = 1080; canvas.height = 1350;
  ctx.fillStyle = p.bg; ctx.fillRect(0, 0, 1080, 1350);
  ctx.strokeStyle = p.accent; ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, 1016, 1286); ctx.strokeRect(44, 44, 992, 1262);
  if (theme === 'paper-cut') {
    for (let x = 65; x < 1050; x += 50) {
      for (const y of [68, 1282]) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4); ctx.fillStyle = p.accent;
        ctx.fillRect(-8, -8, 16, 16); ctx.restore();
      }
    }
    for (const x of [100, 980]) {
      ctx.beginPath(); ctx.arc(x, 200, 36, 0, Math.PI * 2); ctx.stroke();
      for (let n = 0; n < 8; n++) { ctx.save(); ctx.translate(x, 200); ctx.rotate(n * Math.PI / 4); ctx.fillStyle = p.accent; ctx.fillRect(-4, 14, 8, 16); ctx.restore(); }
    }
  } else if (theme === 'ink') {
    ctx.save(); ctx.globalAlpha = .1; ctx.strokeStyle = p.text;
    for (let n = 0; n < 8; n++) { ctx.lineWidth = 4 + n; ctx.beginPath(); ctx.ellipse(830, 200, 135 + n * 3, 90 + n * 3, -.2, .2, 5.7); ctx.stroke(); }
    ctx.restore();
  } else {
    ctx.save(); ctx.globalAlpha = .22;
    for (const x of [80, 1000]) { for (let r = 42; r <= 98; r += 18) { ctx.beginPath(); ctx.arc(x, 200, r, 0, Math.PI * 2); ctx.stroke(); } }
    ctx.restore();
  }
  function text(value, x, y, size, color = p.text, serif = false, align = 'left') {
    ctx.font = `${serif ? '' : '500 '}${size}px ${serif ? 'Georgia, serif' : 'Arial, sans-serif'}`;
    ctx.fillStyle = color; ctx.textAlign = align; ctx.fillText(value, x, y);
  }
  function wrap(value, x, y, width, size, lineHeight, color = p.text, serif = false, align = 'left') {
    ctx.font = `${serif ? '' : '500 '}${size}px ${serif ? 'Georgia, serif' : 'Arial, sans-serif'}`;
    const words = value.split(' '); let line = ''; const lines = [];
    for (const word of words) { const next = line ? `${line} ${word}` : word; if (ctx.measureText(next).width > width && line) { lines.push(line); line = word; } else line = next; }
    if (line) lines.push(line);
    lines.forEach((line, i) => text(line, x, y + i * lineHeight, size, color, serif, align));
    return y + lines.length * lineHeight;
  }
  text('DAILY CHINESE ZODIAC FORTUNE CARD', 540, 117, 23, p.accent, false, 'center');
  text(card.date, 540, 158, 23, p.muted, false, 'center');
  text(card.zodiac.symbol, 540, 271, 84, p.accent, true, 'center');
  text(`The ${card.zodiac.name}`, 540, 340, 55, p.text, true, 'center');
  text('A SMALL REFLECTION FOR TODAY', 540, 387, 21, p.muted, false, 'center');
  ctx.beginPath(); ctx.moveTo(90, 419); ctx.lineTo(990, 419); ctx.stroke();
  for (const [i, key] of ['overall', 'love', 'work', 'money'].entries()) {
    const y = 469 + i * 125;
    text(key === 'overall' ? 'OVERALL FORTUNE' : key.toUpperCase(), 90, y, 21, p.accent);
    wrap(card[key], 90, y + 37, 900, 32, 39);
  }
  ctx.fillStyle = p.panel; ctx.fillRect(76, 961, 928, 116);
  for (const [i, item] of [['LUCKY COLOR', card.color], ['LUCKY NUMBER', String(card.number)], ['LUCKY DIRECTION', card.direction]].entries()) {
    const x = 230 + i * 310;
    text(item[0], x, 1002, 19, p.muted, false, 'center'); text(item[1], x, 1043, 28, p.text, true, 'center');
  }
  wrap(`“${card.quote}”`, 540, 1131, 860, 31, 40, p.text, true, 'center');
  text('For entertainment & cultural interest. Not a prediction.', 540, 1235, 20, p.muted, false, 'center');
  text('chinesefortunetools.online/daily-zodiac-card', 540, 1272, 19, p.muted, false, 'center');
}
