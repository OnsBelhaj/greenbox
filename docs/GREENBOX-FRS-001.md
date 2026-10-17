# GREENBOX-FRS-001 — Cahier des charges fonctionnel

**Produit :** GreenBox, jardinerie et fleuriste en ligne avec retrait en magasin (« click & collect »).
**Version :** 0.1 (jour 1) — **Statut :** brouillon de travail
**Public :** équipe projet (dév, QA)

Ce document est la **source de vérité** pour les tests. Toute exigence a un identifiant unique (`FR-XXX-nnn`) afin de pouvoir tracer chaque cas de test vers une exigence.

---

## 1. Périmètre

GreenBox vend des plantes, des bouquets composés sur mesure, des pots, de l'outillage et des produits phytosanitaires. Il n'y a **pas de livraison** : le client choisit un créneau de retrait dans l'unique magasin.

Rôles :

| Rôle | Description |
|---|---|
| Visiteur | Navigue dans le catalogue sans compte |
| Client | Compte créé et connecté, peut commander |
| Staff | Employé du magasin, accès au back-office « L'Atelier » |
| Admin | Gère les comptes staff et le catalogue |

## 2. Catalogue

| ID | Exigence |
|---|---|
| FR-CAT-001 | Le catalogue liste les produits actifs avec : nom, catégorie, prix TTC, disponibilité. |
| FR-CAT-002 | Catégories : `plantes`, `bouquets`, `pots`, `outils`, `phytosanitaires`. |
| FR-CAT-003 | Le catalogue peut être filtré par catégorie. Une catégorie inconnue renvoie une erreur 400. |
| FR-CAT-004 | Un produit dont le stock est à 0 est affiché « Rupture » et ne peut pas être ajouté au panier. |
| FR-CAT-005 | Les prix sont stockés en centimes et affichés en euros avec 2 décimales. |
| FR-CAT-006 | Le détail d'un produit inexistant renvoie une erreur 404. |
| FR-CAT-007 | Les produits phytosanitaires sont marqués « Réservé aux majeurs ». |

## 3. Composeur de bouquet *(jour 2)*

| ID | Exigence |
|---|---|
| FR-BQT-001 | Un bouquet contient entre 3 et 15 tiges, d'au moins 2 variétés différentes. |
| FR-BQT-002 | Le prix du bouquet = somme des tiges + 4,00 € de conditionnement. |
| FR-BQT-003 | Le papier cadeau est optionnel (+2,50 €). |
| FR-BQT-004 | Un message de carte de 150 caractères maximum est autorisé. |

## 4. Créneaux de retrait

| ID | Exigence |
|---|---|
| FR-SLT-001 | Le magasin est ouvert **du mardi au samedi** ; il est **fermé le dimanche et le lundi**. |
| FR-SLT-002 | Les créneaux durent 1 heure, de 10:00 à 18:00 (dernier créneau 17:00–18:00). |
| FR-SLT-003 | Le délai minimum de préparation est de 24 heures : aucun créneau n'est proposé dans les 24 h à venir. |
| FR-SLT-004 | Les créneaux sont proposés sur 7 jours glissants à partir de demain. |
| FR-SLT-005 | Chaque créneau a une capacité de 5 commandes. Un créneau complet n'est plus proposé. |
| FR-SLT-006 | Un créneau réservé par un client est libéré s'il annule au plus tard 12 h avant. |

## 5. Restriction d'âge

| ID | Exigence |
|---|---|
| FR-AGE-001 | Les produits phytosanitaires sont interdits aux moins de 18 ans. |
| FR-AGE-002 | L'âge est calculé à partir de la date de naissance saisie à l'inscription, **jour et mois compris** (un client qui a 17 ans et 11 mois est mineur). |
| FR-AGE-003 | À l'inscription, un client de moins de 16 ans est refusé. |
| FR-AGE-004 | Un client mineur (16–17 ans) peut s'inscrire mais ne peut pas commander de phytosanitaires. |
| FR-AGE-005 | Une pièce d'identité est vérifiée au retrait pour les phytosanitaires. |

## 6. Comptes clients

| ID | Exigence |
|---|---|
| FR-ACC-001 | Inscription avec : prénom, nom, email, mot de passe, date de naissance. |
| FR-ACC-002 | L'email doit être valide et **unique, sans tenir compte de la casse** (`A@x.fr` = `a@x.fr`). |
| FR-ACC-003 | Le mot de passe fait **au moins 8 caractères**. |
| FR-ACC-004 | Le mot de passe n'est jamais stocké ni renvoyé en clair. |
| FR-ACC-005 | La connexion renvoie un jeton valable 2 heures. |
| FR-ACC-006 | Après 5 échecs de connexion consécutifs, le compte est verrouillé 15 minutes. |
| FR-ACC-007 | Un message d'erreur de connexion ne doit pas révéler si l'email existe. |
| FR-ACC-008 | Un client ne peut consulter et modifier que **son propre** profil et **ses propres** commandes. |

## 7. Panier et paiement *(jour 3)*

| ID | Exigence |
|---|---|
| FR-PAY-001 | Le panier accepte de 1 à 20 articles distincts, quantité de 1 à 10 par article. |
| FR-PAY-002 | TVA : 5,5 % sur plantes et bouquets, 20 % sur le reste. Arrondi au centime le plus proche, par ligne. |
| FR-PAY-003 | Le total est **toujours recalculé côté serveur** ; le prix envoyé par le navigateur est ignoré. |
| FR-PAY-004 | Un code promo (`BIENVENUE10`) donne 10 % sur le total hors phytosanitaires, une seule fois par compte. |
| FR-PAY-005 | Un stock insuffisant au moment du paiement bloque la commande et informe le client. |
| FR-PAY-006 | Le paiement se fait par carte (simulé) ; un paiement refusé ne consomme ni stock ni créneau. |

## 8. Back-office « L'Atelier » *(jour 3)*

| ID | Exigence |
|---|---|
| FR-BO-001 | Le staff voit la liste des commandes à préparer, triée par créneau. |
| FR-BO-002 | Statuts : `payée` → `en préparation` → `prête` → `retirée` (ou `annulée`). Les transitions inverses sont interdites. |
| FR-BO-003 | Seul le staff peut changer un statut ; un client reçoit une erreur 403. |
| FR-BO-004 | L'admin peut modifier prix et stock. Toute modification est journalisée (qui, quand, ancienne et nouvelle valeur). |

## 9. Sécurité et non-fonctionnel

| ID | Exigence |
|---|---|
| FR-SEC-001 | Toute route non publique exige un jeton valide ; sans jeton → 401, jeton d'un autre rôle → 403. |
| FR-SEC-002 | Aucune donnée d'un autre client n'est accessible en modifiant un identifiant dans l'URL (pas d'IDOR). |
| FR-SEC-003 | Les champs texte sont nettoyés : aucun script saisi ne doit s'exécuter à l'affichage (XSS). |
| FR-SEC-004 | Les erreurs ne divulguent jamais de trace technique (pile d'appels, requête SQL, chemin de fichier). |
| FR-NFR-001 | Les routes de lecture du catalogue répondent en moins de 500 ms avec 100 produits. |

## 10. Hors périmètre

Livraison à domicile, paiement réel, multi-magasins, application mobile.

---

## Historique

| Version | Date | Changement |
|---|---|---|
| 0.1 | 2026-10-17 | Création : catalogue, créneaux, âge, comptes. Sections 3, 7 et 8 à implémenter. |
