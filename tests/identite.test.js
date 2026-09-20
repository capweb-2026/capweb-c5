import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { persona, validatePersona, compterEmojis } from '../public/js/persona.js';

// Tests rouges de l'identité Cavalier, critères 1 à 5 de SPEC.md.
// Ils échouent tant que public/js/persona.js n'existe pas.

const ACCUEIL_SPEC = 'Bonjour, je suis Cavalier, ton coach d\'échecs pour débutants.';
const SUGGESTIONS_ATTENDUES = [
  'Comment déplacer les pièces ?',
  'Comment faire échec et mat ?',
  'Quelle ouverture apprendre en premier ?',
];

const identiteValide = () => ({
  nom: 'Cavalier',
  emoji: '♟️',
  accueil: ACCUEIL_SPEC,
  suggestions: [...SUGGESTIONS_ATTENDUES],
});

describe('Identité Cavalier — critère 1 (nom)', () => {
  it('expose le nom Cavalier', () => {
    assert.equal(persona.nom, 'Cavalier');
  });

  it('accepte 2 et 20 caractères, espaces rognés', () => {
    for (const nom of ['ab', 'a'.repeat(20), '  ab  ', `  ${'a'.repeat(20)}  `]) {
      const r = validatePersona({ ...identiteValide(), nom });
      assert.equal(r.ok, true, `attendu ok pour ${JSON.stringify(nom)}`);
    }
  });

  it('refuse 1 et 21 caractères', () => {
    for (const nom of ['a', 'a'.repeat(21), '  a  ', `  ${'a'.repeat(21)}  `]) {
      const r = validatePersona({ ...identiteValide(), nom });
      assert.equal(r.ok, false, `attendu refus pour ${JSON.stringify(nom)}`);
      assert.ok(Array.isArray(r.erreurs) && r.erreurs.length > 0);
    }
  });

  it('refuse vide, espaces seules et non-chaînes', () => {
    for (const nom of ['', '   ', 42, null, undefined, {}]) {
      const r = validatePersona({ ...identiteValide(), nom });
      assert.equal(r.ok, false, `attendu refus pour ${String(nom)}`);
      assert.ok(Array.isArray(r.erreurs) && r.erreurs.length > 0);
    }
  });
});

describe('Identité Cavalier — critère 2 (emoji)', () => {
  it('expose l’emoji ♟️', () => {
    assert.equal(persona.emoji, '♟️');
  });

  it('compte les emojis, pas les unités de code', () => {
    assert.equal(compterEmojis('♟️'), 1);
    assert.equal(compterEmojis('♟️♟️'), 2);
    assert.equal(compterEmojis('Cavalier'), 0);
    assert.equal(compterEmojis('🛡️'), 1);
    assert.equal(compterEmojis('♟️ Cavalier'), 1);
  });

  it('valide un seul emoji et refuse le reste', () => {
    assert.deepEqual(validatePersona(identiteValide()), { ok: true });
    for (const emoji of ['♟️♟️', '♟️ Cavalier', 'Cavalier', '', '   ']) {
      const r = validatePersona({ ...identiteValide(), emoji });
      assert.equal(r.ok, false, `attendu refus pour ${JSON.stringify(emoji)}`);
      assert.ok(Array.isArray(r.erreurs) && r.erreurs.length > 0);
    }
  });
});

describe('Identité Cavalier — critère 3 (accueil)', () => {
  it('expose le texte d’accueil exact', () => {
    assert.equal(persona.accueil, ACCUEIL_SPEC);
  });

  it('refuse un accueil sans le nom Cavalier', () => {
    const r = validatePersona({ ...identiteValide(), accueil: 'Bonjour, je suis ton coach.' });
    assert.equal(r.ok, false);
    assert.ok(Array.isArray(r.erreurs) && r.erreurs.length > 0);
  });
});

describe('Identité Cavalier — critère 4 (suggestions)', () => {
  it('expose les trois suggestions dans l’ordre', () => {
    assert.deepEqual(persona.suggestions, SUGGESTIONS_ATTENDUES);
  });

  it('refuse deux ou quatre suggestions', () => {
    for (const suggestions of [
      SUGGESTIONS_ATTENDUES.slice(0, 2),
      [...SUGGESTIONS_ATTENDUES, 'Une quatrième ?'],
    ]) {
      const r = validatePersona({ ...identiteValide(), suggestions });
      assert.equal(r.ok, false);
      assert.ok(Array.isArray(r.erreurs) && r.erreurs.length > 0);
    }
  });

  it('refuse une suggestion vide ou faite d’espaces', () => {
    for (const suggestions of [
      [SUGGESTIONS_ATTENDUES[0], '', SUGGESTIONS_ATTENDUES[2]],
      [SUGGESTIONS_ATTENDUES[0], '   ', SUGGESTIONS_ATTENDUES[2]],
    ]) {
      const r = validatePersona({ ...identiteValide(), suggestions });
      assert.equal(r.ok, false);
      assert.ok(Array.isArray(r.erreurs) && r.erreurs.length > 0);
    }
  });
});

describe('Identité Cavalier — critère 5 (réponses signées)', () => {
  it('view.js ne signe plus Cap Web', async () => {
    const code = await readFile(new URL('../public/js/view.js', import.meta.url), 'utf8');
    assert.doesNotMatch(code, /Cap Web/);
  });
});
