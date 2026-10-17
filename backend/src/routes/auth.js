const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { computeAge, isValidDate } = require('../lib/age');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'greenbox-dev-secret';
const TOKEN_TTL = '2h';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Stockage en mémoire (remplacé par une vraie base plus tard).
const users = [];
let nextId = 1;

function publicUser(u) {
  return { id: u.id, firstName: u.firstName, lastName: u.lastName, email: u.email, birthDate: u.birthDate };
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Authentification requise' });
  try {
    req.auth = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Jeton invalide ou expiré' });
  }
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, birthDate } = req.body || {};

  if (!firstName || !lastName || !email || !password || !birthDate) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Email invalide' });
  }
  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'Le mot de passe doit faire au moins 8 caractères' });
  }
  if (!isValidDate(birthDate)) {
    return res.status(400).json({ error: 'Date de naissance invalide (format AAAA-MM-JJ)' });
  }
  if (computeAge(birthDate) < 16) {
    return res.status(400).json({ error: 'Inscription réservée aux 16 ans et plus' });
  }
  if (users.some((u) => u.email === email)) {
    return res.status(409).json({ error: 'Un compte existe déjà avec cet email' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: nextId, firstName, lastName, email, birthDate, passwordHash, role: 'client' };
  nextId += 1;
  users.push(user);
  return res.status(201).json(publicUser(user));
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }
  const user = users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
  const ok = user && (await bcrypt.compare(password, user.passwordHash));
  if (!ok) {
    return res.status(401).json({ error: 'Identifiants incorrects' });
  }
  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_TTL });
  return res.json({ token, user: publicUser(user) });
});

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  const user = users.find((u) => u.id === req.auth.sub);
  if (!user) return res.status(404).json({ error: 'Compte introuvable' });
  return res.json(publicUser(user));
});

module.exports = router;
module.exports.requireAuth = requireAuth;
