import { validateMessage, replyTo } from './brain.js';
import { renderMessages } from './view.js';

const formulaire = document.querySelector('#chat-form');
const statut = document.querySelector('#status');
const versionElt = document.querySelector('#version');
const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const effacer = document.querySelector('#effacer');

const historique = []

const sauvegarde = localStorage.getItem('capweb.historique');

if (sauvegarde) {
    try {
        const messages = JSON.parse(sauvegarde);
        historique.push(...messages);
    } catch (erreur) {
        statut.textContent = 'Impossible de charger la conversation sauvegardée.';
    }
}

renderMessages(historique, liste);

formulaire?.addEventListener('submit', (event) => {

    event.preventDefault();

    const resultat = validateMessage(champ.value);

    if (!resultat.ok) {
        statut.textContent = resultat.error;
        champ.focus();
        return;
    }

    const texte = resultat.value;

    historique.push({
        role: 'user',
        text: texte
    });

    const reponse = replyTo(texte);

    historique.push({
        role: 'assistant',
        text: reponse
    });

    localStorage.setItem('capweb.historique', JSON.stringify(historique))

    renderMessages(historique, liste);

    champ.value = '';
    statut.textContent = '';
    champ.focus();
});

effacer?.addEventListener('click', () => {
    if (confirm('Voulez-vous vraiment effacer la conversation ?')) {
        historique.length = 0;
        localStorage.removeItem('capweb.historique');
        renderMessages(historique, liste);
    }
});


// Version du serveur local, échec discret si indisponible.
fetch('/version.json', { headers: { accept: 'application/json' } })
    .then((reponse) => (reponse.ok ? reponse.json() : null))
    .then((donnees) => {
        if (donnees && typeof donnees.version === 'string' && versionElt) {
            versionElt.textContent = `version ${donnees.version}`;
        }
    })
    .catch(() => { });
