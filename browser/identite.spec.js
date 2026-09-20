import { test, expect } from '@playwright/test';

// Tests rouges de l'identité Cavalier dans le navigateur, critères 1 à 5 de SPEC.md.
// Ils échouent tant que l'identité n'est pas affichée (h1 Cap Web, pas de #accueil ni #suggestions).
// Fichier neuf : le contrat de browser/contrat.spec.js n'est pas modifié.

async function pageNeuve(page) {
  await page.goto('/');
  await page.evaluate(() => globalThis.localStorage.clear());
  await page.reload();
}

async function envoyer(page, texte) {
  await page.locator('#message').fill(texte);
  await page.getByRole('button', { name: /envoyer/i }).click();
}

const lignes = (page) => page.locator('#messages li');

const SUGGESTIONS_ATTENDUES = [
  'Comment déplacer les pièces ?',
  'Comment faire échec et mat ?',
  'Quelle ouverture apprendre en premier ?',
];

test.describe('Identité Cavalier — critères 1 et 2 (titre)', () => {
  test('le h1 affiche le nom Cavalier', async ({ page }) => {
    await pageNeuve(page);
    await expect(page.locator('h1')).toContainText('Cavalier');
  });

  test('le h1 affiche l’emoji ♟️', async ({ page }) => {
    await pageNeuve(page);
    await expect(page.locator('h1')).toContainText('♟️');
  });
});

test.describe('Identité Cavalier — critère 3 (accueil)', () => {
  test('conversation vide : accueil affiché hors #messages, aucune ligne', async ({ page }) => {
    await pageNeuve(page);
    await expect(page.locator('#accueil')).toBeVisible();
    await expect(page.locator('#accueil')).toHaveText(
      'Bonjour, je suis Cavalier, ton coach d’échecs pour débutants.',
    );
    await expect(lignes(page)).toHaveCount(0);
  });

  test('le premier message masque #accueil', async ({ page }) => {
    await pageNeuve(page);
    await envoyer(page, 'salut');
    await expect(lignes(page)).toHaveCount(2);
    await expect(page.locator('#accueil')).toBeHidden();
  });

  test('effacer la conversation réaffiche #accueil', async ({ page }) => {
    await pageNeuve(page);
    await envoyer(page, 'salut');
    await expect(lignes(page)).toHaveCount(2);
    page.once('dialog', (d) => d.accept());
    await page.locator('#effacer').click();
    await expect(lignes(page)).toHaveCount(0);
    await expect(page.locator('#accueil')).toBeVisible();
  });
});

test.describe('Identité Cavalier — critère 4 (suggestions)', () => {
  test('trois boutons dans l’ordre, en dehors de #messages', async ({ page }) => {
    await pageNeuve(page);
    const boutons = page.locator('#suggestions button');
    await expect(boutons).toHaveCount(3);
    for (let i = 0; i < SUGGESTIONS_ATTENDUES.length; i += 1) {
      await expect(boutons.nth(i)).toHaveText(SUGGESTIONS_ATTENDUES[i]);
    }
    await expect(page.locator('#messages #suggestions')).toHaveCount(0);
  });

  test('cliquer remplit #message sans envoyer', async ({ page }) => {
    await pageNeuve(page);
    await page.locator('#suggestions button').first().click();
    await expect(page.locator('#message')).toHaveValue(SUGGESTIONS_ATTENDUES[0]);
    await expect(lignes(page)).toHaveCount(0);
  });
});

test.describe('Identité Cavalier — critère 5 (réponses signées)', () => {
  test('l’assistant signe Cavalier, l’utilisateur garde Vous', async ({ page }) => {
    await pageNeuve(page);
    await envoyer(page, 'salut');
    await expect(lignes(page)).toHaveCount(2);
    await expect(lignes(page).nth(0)).toContainText('Vous');
    await expect(lignes(page).nth(1)).toContainText('Cavalier');
  });

  test('aucune ligne ne contient Cap Web', async ({ page }) => {
    await pageNeuve(page);
    await envoyer(page, 'salut');
    await expect(lignes(page)).toHaveCount(2);
    await expect(page.locator('#messages li', { hasText: 'Cap Web' })).toHaveCount(0);
    await page.reload();
    await expect(page.locator('#messages li', { hasText: 'Cap Web' })).toHaveCount(0);
  });
});
