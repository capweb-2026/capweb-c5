# Carte des défenses

Chaque ligne dit quelle connerie est arrêtée, par quoi, et **où est la preuve** : le lien d'un run rouge ou d'une PR bloquée. Une barrière sans preuve ne compte pas.

| Connerie | Barrière qui l'arrête | Preuve (lien) | Checkpoint |
|---|---|---|---|
| Régression | Tests de contrat et CI obligatoire sur `main` | https://github.com/capweb-2026/capweb-c5/actions/runs/34945648020 : premier run du dépôt sur `main`, rouge à `npm test`, le contrat refusant un projet sans chatbot (`Cannot find module public/js/brain.js`). https://github.com/capweb-2026/capweb-c5/actions/runs/35535216966 : run rouge du commit `test: identité de l'assistant`, rouge à `npm test` sur `Cannot find module public/js/persona.js`. Les tests d'identité ont su échouer avant le code. | CP1, CP2-2 |
| Test affaibli ou supprimé | `check:tests` (TEST-CHANGE obligatoire) et relecture humaine | **Aucune preuve à ce jour** : aucune PR piégée n'est arrivée dans ce dépôt, et la barrière n'a donc jamais eu à s'exercer. Nos deux fichiers de tests sont des ajouts, jamais des modifications : `check:tests` n'exige `TEST-CHANGE:` que pour un test déjà présent sur `main`. Nous ne fabriquons pas de fausse preuve. | CP2 |
| Dépendance ajoutée | `check:deps` et `dependances-autorisees.json` | **Aucune preuve à ce jour** : aucune PR piégée n'est arrivée, et aucune dépendance n'a été ajoutée au projet. Nous ne fabriquons pas de fausse dépendance, `package-lock.json` devant rester cohérent. | CP2 |
| Secret exposé | | | CP3 |
| IA qui sort de son thème | | | CP3 |
| Faille (`innerHTML`, injection) | | | CP4 |
| Contrôle désactivé | | | CP4 |
| Action destructrice | | | CP4 |

## Ce qui manque, et pourquoi

Deux lignes n'ont pas de preuve : « Test affaibli ou supprimé » et « Dépendance ajoutée ». Le CP2-4 attendait pour chacune le lien d'une PR piégée refusée. **Aucune PR piégée n'est arrivée dans ce dépôt** : les cinq PR ouvertes à ce jour viennent du binôme. La fiche interdit de fabriquer soi-même une fausse dépendance ou un faux test affaibli, nous avons donc laissé ces lignes vides plutôt que d'inventer une preuve.

Les deux barrières existent et sont testées par le harnais (`tests/harnais/check-tests.test.js` et `tests/harnais/check-dependances.test.js`), mais un test du harnais n'est pas une preuve au sens de cette carte : il montre que le script fonctionne, pas qu'il a arrêté une connerie réelle dans ce dépôt.

## Mises en prod

| Tag | Commit | Run avec approbation humaine |
|---|---|---|
| `prod-16` | `92d3674` | https://github.com/capweb-2026/capweb-c5/actions/runs/35539699173 |
| `prod-20` | `a215e74` | https://github.com/capweb-2026/capweb-c5/actions/runs/35541654136, approuvé par `calli77` |

La prod ne reçoit `main` qu'après cette approbation, et `/version.json` permet de vérifier à tout moment quel commit elle sert.
