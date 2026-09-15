export function renderMessages(messages, container) {
  const lignes = messages.map((msg) => {
    const li = document.createElement('li');
    const etiquette = msg.role === 'user' ? 'Vous' : 'Cap Web';
    li.textContent = `${etiquette} : ${msg.text}`;
    return li;
  });
  container.replaceChildren(...lignes);
}
