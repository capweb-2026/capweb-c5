# SPEC.md — L'identité de Cavalier

## Objectif

Cavalier est un coach d'échecs pour débutants. Il aide l'utilisateur à découvrir les règles et les premières notions des échecs avec des réponses simples, courtes et adaptées à une première partie.

## Comment on compte les emojis

Un emoji est une suite de caractères `Extended_Pictographic` avec ses modificateurs, sélecteur de variation `U+FE0F` compris. On ne compte pas les unités de code : « ♟️ » (`'♟️'.length` vaut 2) et « 🛡️ » (`'🛡️'.length` vaut 3) comptent chacun pour **un seul** emoji.

## Critères d'acceptation

1. **Nom** — Quand la page s'ouvre, le système affiche le nom « Cavalier » dans le titre principal `h1`. Un nom est valide quand, les espaces de début et de fin retirés, il compte de 2 à 20 caractères : 2 et 20 caractères sont acceptés, 1 et 21 sont refusés. Un nom vide, composé uniquement d'espaces, ou qui n'est pas une chaîne de caractères, est refusé.

2. **Emoji** — Quand la page s'ouvre, le système affiche l'emoji « ♟️ » dans le titre principal `h1`, à côté du nom. Un emoji est valide quand il contient exactement un emoji au sens de la section « Comment on compte les emojis » : « ♟️ » est accepté, « ♟️♟️ » est refusé, « ♟️ Cavalier » est refusé, une chaîne sans emoji est refusée, une chaîne vide est refusée.

3. **Accueil** — Quand la conversation est vide, le système affiche « Bonjour, je suis Cavalier, ton coach d'échecs pour débutants. » dans l'élément `#accueil`, qui est en dehors de `#messages` ; `#messages` ne contient alors aucune ligne. Un accueil est valide quand il contient le nom : un accueil qui ne contient pas « Cavalier » est refusé. Quand l'utilisateur envoie son premier message, le système masque `#accueil`. Quand la conversation est effacée, le système affiche `#accueil` de nouveau.

4. **Suggestions** — Quand la page s'ouvre, le système affiche dans `#suggestions`, en dehors de `#messages`, exactement trois boutons portant dans cet ordre « Comment déplacer les pièces ? », « Comment faire échec et mat ? » et « Quelle ouverture apprendre en premier ? ». Une liste de suggestions est valide quand elle compte exactement trois textes non vides : deux suggestions sont refusées, quatre suggestions sont refusées, une suggestion vide ou faite d'espaces est refusée. Quand l'utilisateur clique sur une suggestion, le système écrit son texte dans `#message` et n'envoie pas le formulaire : `#messages` ne gagne aucune ligne.

5. **Réponses signées** — Quand l'assistant répond, le système étiquette sa ligne « Cavalier ». Les lignes de l'utilisateur gardent l'étiquette « Vous ». Aucune ligne affichée ne contient « Cap Web ».

6. **Contrat** — Quand l'identité est en place, les tests de contrat CP1 de `tests/contrat/` et de `browser/contrat.spec.js` restent verts, sans qu'aucun de ces fichiers ait été modifié.

## Hors périmètre

- Pas de partie complète contre l'utilisateur ou contre un moteur d'échecs.
- Pas de calcul de coups optimal, d'analyse de position ou de notation de partie.
- Pas de compte utilisateur, de classement ou de sauvegarde de parties.
- Pas d'appel à une IA externe.
- Pas de choix ou de modification de l'identité par l'utilisateur.

## Données et fonctions attendues

- `public/js/persona.js` exporte `persona = { nom, emoji, accueil, suggestions }` avec `nom = 'Cavalier'`, `emoji = '♟️'`, `accueil` = « Bonjour, je suis Cavalier, ton coach d'échecs pour débutants. » et `suggestions` = les trois questions du critère 4, dans l'ordre.
- `public/js/persona.js` exporte `validatePersona(persona)`, fonction pure, qui renvoie `{ ok: true }` pour une identité valide, ou `{ ok: false, erreurs: [texte, ...] }` avec au moins une erreur pour une identité invalide, selon les règles des critères 1 à 4.
- `public/js/persona.js` exporte `compterEmojis(texte)`, fonction pure, qui renvoie le nombre d'emojis du texte au sens de la section « Comment on compte les emojis » : `compterEmojis('♟️')` vaut `1`, `compterEmojis('♟️♟️')` vaut `2`, `compterEmojis('Cavalier')` vaut `0`.
- `public/index.html` contient un `h1` qui porte le nom et l'emoji, un élément `#accueil` et un conteneur `#suggestions`, tous deux en dehors de `#messages`.
- `public/js/view.js` affiche l'identité, l'accueil et les suggestions avec `textContent`, crée les boutons des suggestions, et étiquette les lignes avec le nom de `persona` au lieu de « Cap Web ».
- `public/js/app.js` affiche l'accueil au démarrage, le masque au premier message envoyé, le réaffiche après l'effacement de la conversation, et place le texte d'une suggestion cliquée dans `#message` sans envoyer le formulaire.
- `persona.js` est ajouté à la liste blanche et aux types autorisés de `server/app.js`.

## Questions ouvertes

Aucune pour l'identité de Cavalier. Les règles exactes de réponse aux questions d'échecs seront précisées dans les tests du CP2-2.
