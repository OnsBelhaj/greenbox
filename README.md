# GreenBox

Jardinerie et fleuriste en ligne avec retrait en magasin. Projet d'entraînement en **test logiciel et automatisation** (manuel → API → E2E Playwright → CI/CD GitHub Actions).

> L'application contient des **défauts volontaires**, sans commentaire dans le code. Le but est de les trouver par les tests, à partir du cahier des charges.

## Documentation

- [Cahier des charges GREENBOX-FRS-001](docs/GREENBOX-FRS-001.md) : source de vérité des exigences.

## Démarrer le backend

```bash
cd backend
npm install
npm start          # http://localhost:3000
```

Variables d'environnement : `PORT` (défaut 3000), `APP_ENV` (`dev`, `staging`, `prod`), `JWT_SECRET`.

## Routes disponibles (jour 1)

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/health` | État du service |
| GET | `/api/products` | Catalogue, filtre `?category=` |
| GET | `/api/products/:id` | Détail d'un produit |
| GET | `/api/slots` | Créneaux de retrait disponibles |
| POST | `/api/auth/register` | Inscription |
| POST | `/api/auth/login` | Connexion (renvoie un jeton) |
| GET | `/api/auth/me` | Profil du client connecté |

## Feuille de route

Objectif : construire pas à pas un projet de test complet avec **Playwright** (tests API, Page Object Model, Cucumber/BDD) et un pipeline **CI/CD GitHub Actions**.

| Étape | Contenu | État |
|---|---|---|
| 1 | Cahier des charges + API catalogue, créneaux, comptes | fait |
| 2 | Composeur de bouquet, verrouillage de compte, frontend React | à faire |
| 3 | Panier, paiement, back-office « L'Atelier » | à faire |
| 4 | Test exploratoire, plan de test manuel, matrice de cas de test, rapports de bugs | en cours |
| 5 | Tests unitaires (logique métier) et tests API Playwright, avec un client API réutilisable | à faire |
| 6 | Pipeline GitHub Actions (tests à chaque push et PR, rapport, environnements dev et staging) | à faire |
| 7 | Tests E2E Playwright avec Page Object Model, sur les parcours critiques | à faire |
| 8 | Cucumber (BDD) : scénarios Gherkin sur 3 à 4 parcours clés, liés aux exigences FR-xxx | à faire |
| Final | Mise en forme portfolio | à faire |
