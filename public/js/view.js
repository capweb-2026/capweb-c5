import { persona } from './persona.js';

export function renderMessages(messages, container) {
  const lignes = messages.map((msg) => {
    const li = document.createElement('li');
    const etiquette = msg.role === 'user' ? 'Vous' : persona.nom;
    li.textContent = `${etiquette} : ${msg.text}`;
    return li;
  });
  container.replaceChildren(...lignes);
}

export function afficherAccueil(element, visible) {
  element.textContent = persona.accueil;
  element.hidden = !visible;
}

export function afficherSuggestions(conteneur, auClic) {
  const boutons = persona.suggestions.map((texte) => {
    const bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.textContent = texte;
    bouton.addEventListener('click', () => {
      auClic(texte);
    });
    return bouton;
  });
  conteneur.replaceChildren(...boutons);
}
