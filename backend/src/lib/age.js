// Calcul de l'âge à partir d'une date de naissance au format AAAA-MM-JJ.
function computeAge(birthDateIso, today = new Date()) {
  const birth = new Date(birthDateIso);
  return today.getFullYear() - birth.getFullYear();
}

function isValidDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

module.exports = { computeAge, isValidDate };
