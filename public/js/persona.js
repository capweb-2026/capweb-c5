const NOM = 'Cavalier';
const EMOJI = '♟️';
const ACCUEIL = "Bonjour, je suis Cavalier, ton coach d'échecs pour débutants.";
const SUGGESTIONS = [
  'Comment déplacer les pièces ?',
  'Comment faire échec et mat ?',
  'Quelle ouverture apprendre en premier ?',
];

export const persona = {
  nom: NOM,
  emoji: EMOJI,
  accueil: ACCUEIL,
  suggestions: [...SUGGESTIONS],
};

function decouperGraphemes(texte) {
  if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
    const segmenteur = new Intl.Segmenter('fr', { granularity: 'grapheme' });
    return [...segmenteur.segment(texte)].map((s) => s.segment);
  }
  return [...texte];
}

export function compterEmojis(texte) {
  if (typeof texte !== 'string' || texte.length === 0) {
    return 0;
  }
  const graphemes = decouperGraphemes(texte);
  let total = 0;
  for (const grapheme of graphemes) {
    if (/\p{Extended_Pictographic}/u.test(grapheme)) {
      total += 1;
    }
  }
  return total;
}

function nomValide(nom) {
  if (typeof nom !== 'string') {
    return false;
  }
  const rogne = nom.trim();
  if (rogne.length === 0) {
    return false;
  }
  const longueur = [...rogne].length;
  return longueur >= 2 && longueur <= 20;
}

function emojiValide(emoji) {
  if (typeof emoji !== 'string') {
    return false;
  }
  const rogne = emoji.trim();
  if (rogne.length === 0) {
    return false;
  }
  if (compterEmojis(rogne) !== 1) {
    return false;
  }
  return decouperGraphemes(rogne).length === 1;
}

function accueilValide(accueil) {
  return typeof accueil === 'string' && accueil.includes('Cavalier');
}

function suggestionsValides(suggestions) {
  if (!Array.isArray(suggestions) || suggestions.length !== 3) {
    return false;
  }
  return suggestions.every((s) => typeof s === 'string' && s.trim().length > 0);
}

export function validatePersona(candidate) {
  const erreurs = [];
  if (!candidate || typeof candidate !== 'object') {
    return { ok: false, erreurs: ['Identité invalide.'] };
  }
  if (!nomValide(candidate.nom)) {
    erreurs.push('Nom invalide : il doit compter de 2 à 20 caractères une fois rogné.');
  }
  if (!emojiValide(candidate.emoji)) {
    erreurs.push('Emoji invalide : il doit contenir exactement un emoji.');
  }
  if (!accueilValide(candidate.accueil)) {
    erreurs.push('Accueil invalide : il doit contenir « Cavalier ».');
  }
  if (!suggestionsValides(candidate.suggestions)) {
    erreurs.push('Suggestions invalides : il faut exactement trois textes non vides.');
  }
  if (erreurs.length === 0) {
    return { ok: true };
  }
  return { ok: false, erreurs };
}
