const express = require('express');
const { products, CATEGORIES } = require('../data/products');

const router = express.Router();

function toPublic(p) {
  return {
    id: p.id,
    sku: p.sku,
    name: p.name,
    category: p.category,
    priceCents: p.priceCents,
    price: (p.priceCents / 100).toFixed(2),
    stock: p.stock,
    available: p.stock > 0,
    ageRestricted: Boolean(p.ageRestricted),
  };
}

// GET /api/products?category=plantes
router.get('/', (req, res) => {
  const { category } = req.query;
  if (category !== undefined && !CATEGORIES.includes(category)) {
    return res.status(400).json({ error: 'Catégorie inconnue', allowed: CATEGORIES });
  }
  const list = products
    .filter((p) => p.active)
    .filter((p) => (category ? p.category === category : true))
    .map(toPublic);
  res.json({ count: list.length, products: list });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id && p.active);
  if (!product) {
    return res.status(404).json({ error: 'Produit introuvable' });
  }
  res.json(toPublic(product));
});

module.exports = router;
