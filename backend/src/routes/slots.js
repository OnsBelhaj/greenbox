const express = require('express');

const router = express.Router();

const OPENING_HOUR = 10;
const CLOSING_HOUR = 18;
const CAPACITY = 5;
const HORIZON_DAYS = 7;
const MIN_LEAD_MS = 24 * 60 * 60 * 1000;

// Nombre de commandes déjà enregistrées par créneau (clé = "AAAA-MM-JJTHH:00").
const booked = new Map();

function isClosed(date) {
  // Magasin fermé le dimanche.
  return date.getDay() === 0;
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function dayKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function listSlots(now = new Date()) {
  const slots = [];
  for (let offset = 1; offset <= HORIZON_DAYS; offset += 1) {
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    if (isClosed(day)) continue;
    for (let hour = OPENING_HOUR; hour < CLOSING_HOUR; hour += 1) {
      const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour);
      if (start.getTime() - now.getTime() < MIN_LEAD_MS) continue;
      const id = `${dayKey(day)}T${pad(hour)}:00`;
      const used = booked.get(id) || 0;
      if (used >= CAPACITY) continue;
      slots.push({
        id,
        date: dayKey(day),
        start: `${pad(hour)}:00`,
        end: `${pad(hour + 1)}:00`,
        remaining: CAPACITY - used,
      });
    }
  }
  return slots;
}

// GET /api/slots
router.get('/', (req, res) => {
  const slots = listSlots();
  res.json({ count: slots.length, slots });
});

module.exports = router;
module.exports.listSlots = listSlots;
module.exports.booked = booked;
