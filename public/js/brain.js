export function validateMessage(raw) {
  if (typeof raw !== 'string') {
    return { ok: false, error: 'Le message doit être du texte' };
  }
  const value = raw.trim();
  if (value === '') {
    return { ok: false, error: 'Le message ne doit pas être vide' };
  }
  if (value.length > 280) {
    return { ok: false, error: 'Le message ne doit pas dépasser 280 caractères' };
  }
  return { ok: true, value };
}

export function replyTo(message) {
  const texte = message.trim().toLowerCase();

  if (texte === 'salut' || texte === 'bonjour') {
    return 'Salut ! Je suis Cap Web, ton assistant pour apprendre les échecs.';
  }
  if (texte === 'aide') {
    return 'Tu peux me dire « salut », « aide » ou « test » pour commencer.';
  }
  if (texte === 'test') {
    return 'Test reçu, tout fonctionne !';
  }
  if (texte === 'Tu es qui ?' || texte === 'qui es-tu ?') {
    return 'Je suis Cap Web, ton assistant pour apprendre les échecs.';
  }
  if (texte === 'Tu sais jouer aux échecs ?' || texte === 'sais-tu jouer aux échecs ?') {
    return 'Oui, je peux te donner des conseils et des astuces pour progresser aux échecs.';
  }
  if (texte === 'Comment puis-je améliorer mon jeu ?' || texte === 'comment puis-je améliorer mon jeu ?') {
    return 'Pour améliorer ton jeu, je te recommande de pratiquer régulièrement, d\'étudier les ouvertures et de revoir tes parties pour identifier les erreurs.';
  }
  return "Je n'ai pas encore de réponse pour ça, mais je progresse chaque jour.";
}
