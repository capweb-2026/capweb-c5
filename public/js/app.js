import { validateMessage, replyTo } from './brain.js';
import { renderMessages } from './view.js';

const formulaire = document.querySelector("#chat-form");
const statut = document.querySelector("#status");
const versionElt = document.querySelector("#version");
const champ = document.querySelector("#message");
const liste = document.querySelector("#messages");
const boutonEffacer = document.querySelector("#effacer");
const CLE_HISTORIQUE = "capweb.historique";
const historique = [];

function sauvegarder() {
  localStorage.setItem(CLE_HISTORIQUE, JSON.stringify(historique));
}

const brut = localStorage.getItem(CLE_HISTORIQUE);
if (brut) {
  try {
    const donnees = JSON.parse(brut);
    if (Array.isArray(donnees)) {
      historique.push(...donnees);
      renderMessages(historique, liste);
    }
  } catch {
    statut.textContent = "La conversation enregistrée était illisible, elle a été ignorée";
  }
}

formulaire?.addEventListener("submit", (event) => {
  event.preventDefault();
  const resultat = validateMessage(champ.value);

  if (!resultat.ok) {
    statut.textContent = resultat.error;
    champ.focus();
    return;
  }

  historique.push({ role: "user", text: resultat.value });
  historique.push({ role: "assistant", text: replyTo(resultat.value) });
  renderMessages(historique, liste);
  sauvegarder();

  champ.value = "";
  statut.textContent = "";
  champ.focus();
});

boutonEffacer?.addEventListener("click", () => {
  if (!confirm("Effacer toute la conversation ?")) {
    return;
  }
  historique.length = 0;
  localStorage.removeItem(CLE_HISTORIQUE);
  renderMessages(historique, liste);
});

// Version du serveur local, échec discret si indisponible.
fetch("/version.json", { headers: { accept: "application/json" } })
  .then((reponse) => (reponse.ok ? reponse.json() : null))
  .then((donnees) => {
    if (donnees && typeof donnees.version === "string" && versionElt) {
      versionElt.textContent = `version ${donnees.version}`;
    }
  })
  .catch(() => {});
