const express = require('express');
const catalogRoutes = require('./routes/catalog');
const slotsRoutes = require('./routes/slots');
const authRoutes = require('./routes/auth');

function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', env: process.env.APP_ENV || 'dev' });
  });

  app.use('/api/products', catalogRoutes);
  app.use('/api/slots', slotsRoutes);
  app.use('/api/auth', authRoutes);

  app.use((req, res) => {
    res.status(404).json({ error: 'Route introuvable' });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err && err.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'JSON invalide' });
    }
    return res.status(500).json({ error: 'Erreur interne' });
  });

  return app;
}

module.exports = { createApp };
