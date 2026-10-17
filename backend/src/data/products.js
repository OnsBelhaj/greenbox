// Catalogue de démonstration. Prix en centimes TTC (FR-CAT-005).
const products = [
  { id: 1, sku: 'PLT-001', name: 'Monstera deliciosa', category: 'plantes', priceCents: 2490, stock: 12, active: true },
  { id: 2, sku: 'PLT-002', name: 'Ficus lyrata', category: 'plantes', priceCents: 3290, stock: 5, active: true },
  { id: 3, sku: 'PLT-003', name: 'Lavande en pot', category: 'plantes', priceCents: 690, stock: 40, active: true },
  { id: 4, sku: 'PLT-004', name: 'Orchidée phalaenopsis', category: 'plantes', priceCents: 1990, stock: 0, active: true },
  { id: 5, sku: 'BQT-001', name: 'Rose rouge (tige)', category: 'bouquets', priceCents: 250, stock: 200, active: true },
  { id: 6, sku: 'BQT-002', name: 'Tulipe jaune (tige)', category: 'bouquets', priceCents: 180, stock: 150, active: true },
  { id: 7, sku: 'BQT-003', name: 'Eucalyptus (tige)', category: 'bouquets', priceCents: 220, stock: 80, active: true },
  { id: 8, sku: 'BQT-004', name: 'Pivoine rose (tige)', category: 'bouquets', priceCents: 390, stock: 0, active: true },
  { id: 9, sku: 'POT-001', name: 'Pot en terre cuite 20 cm', category: 'pots', priceCents: 1290, stock: 30, active: true },
  { id: 10, sku: 'POT-002', name: 'Cache-pot en céramique blanc', category: 'pots', priceCents: 1890, stock: 18, active: true },
  { id: 11, sku: 'OUT-001', name: 'Sécateur professionnel', category: 'outils', priceCents: 2790, stock: 14, active: true },
  { id: 12, sku: 'OUT-002', name: 'Arrosoir 5 L', category: 'outils', priceCents: 1490, stock: 22, active: true },
  { id: 13, sku: 'PHY-001', name: 'Désherbant concentré 1 L', category: 'phytosanitaires', priceCents: 1890, stock: 9, active: true, ageRestricted: true },
  { id: 14, sku: 'PHY-002', name: 'Anti-pucerons 500 mL', category: 'phytosanitaires', priceCents: 1190, stock: 15, active: true, ageRestricted: true },
  { id: 15, sku: 'OUT-003', name: 'Gants de jardinage', category: 'outils', priceCents: 890, stock: 0, active: false },
];

const CATEGORIES = ['plantes', 'bouquets', 'pots', 'outils', 'phytosanitaires'];

module.exports = { products, CATEGORIES };
