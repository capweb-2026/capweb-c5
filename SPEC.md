# SPEC.md — L'identité de Cavalier

## Objectif

Cavalier est un coach d'échecs pour débutants. Il aide l'utilisateur à découvrir les règles et les premières notions des échecs avec des réponses simples, courtes et adaptées à une première partie.

## Critères d'acceptation

Rédigez chaque critère sous la forme « Quand …, le système … ». Numérotez-les : les tests et les PR y feront référence.

1. **Nom** — Quand la page s'ouvre, le système affiche le nom « Cavalier » dans le titre principal. Le nom, sans les espaces autour, fait de 2 à 20 caractères.
2. **Emoji** — Quand la page s'ouvre, le système affiche exactement un emoji de cavalier, « ♞ », à côté du nom. Cet emoji compte pour un seul emoji visible.
3. **Accueil** — Quand la conversation est vide, le système affiche le message « Bonjour, je suis Cavalier, ton coach d'échecs pour débutants. » Le message contient le nom « Cavalier », n'est pas une ligne de `#messages`, disparaît dès le premier message envoyé et revient quand la conversation est effacée.
4. **Suggestions** — Quand la page s'ouvre, le système propose exactement trois questions : « Comment déplacer les pièces ? », « Comment faire échec et mat ? » et « Quelle ouverture apprendre en premier ? ». Quand l'utilisateur clique sur une suggestion, le système la place dans le champ de saisie sans l'envoyer.
5. **Réponses signées** — Quand l'assistant répond, sa ligne commence par « Cavalier » au lieu de « Cap Web ».
6. **Contrat** — Quand les fonctionnalités de l'identité sont ajoutées, les tests de contrat CP1 restent verts.

Pour chaque critère, un test doit pouvoir échouer si le critère n'est pas respecté.

## Hors périmètre

- Pas de partie complète contre l'utilisateur ou contre un moteur d'échecs.
- Pas de calcul de coups optimal, d'analyse de position ou de notation de partie.
- Pas de compte utilisateur, de classement ou de sauvegarde de parties.
- Pas d'appel à une IA externe.
- Pas de choix ou de modification de l'identité par l'utilisateur.

## Données et fonctions attendues

- `public/js/persona.js` exporte `persona = { nom, emoji, accueil, suggestions }` avec les valeurs définies dans cette spec.
- `public/js/persona.js` exporte `validatePersona(persona)`, qui renvoie `{ ok: true }` pour une identité valide ou `{ ok: false, erreurs: [texte, ...] }` pour une identité invalide.
- `validatePersona` refuse un nom de moins de 2 ou de plus de 20 caractères après suppression des espaces autour, un nom vide, une valeur qui n'est pas du texte, un affichage qui ne contient pas exactement un emoji, un accueil qui ne contient pas le nom, une liste différente de trois suggestions et une suggestion vide.
- `public/index.html` contient un élément `#accueil` et un conteneur `#suggestions`, tous deux en dehors de `#messages`.
- `public/js/view.js` affiche l'identité, l'accueil et les suggestions avec `textContent` et crée les boutons des suggestions.
- `public/js/app.js` affiche l'accueil au démarrage, place une suggestion dans `#message` sans envoyer le formulaire et utilise le nom de `persona` pour identifier les réponses de l'assistant.
- `persona.js` est ajouté aux listes blanches et aux types autorisés de `server/app.js`.

## Questions ouvertes

Aucune pour l'identité de Cavalier. Les règles exactes de réponse aux questions d'échecs seront précisées dans les tests du CP2-2.
