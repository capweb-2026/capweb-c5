export function validateMessage(raw) {
    if (typeof raw !== 'string') {
        return {
            ok: false,
            error: 'Le message doit être une chaîne de caractères'
        };
    }

    const rawTrim = raw.trim();

    if (rawTrim === '') {
        return {
            ok: false,
            error: 'La chaîne de caractère est vide'
        };
    }

    if (rawTrim.length > 280) {
        return {
            ok: false,
            error: 'La limite de 280 caractères a été dépassé'
        };
    }

    return {
        ok: true,
        value: rawTrim
    }
}

export function replyTo(message) {
    const texte = message.trim().toLowerCase();

    if (texte === 'bonjour' || texte === 'salut') {
        return "Bonjour je suis ton chat qui te guidera pour ton apprentissage des échecs"
    }
    if (texte === 'aide') {
        return "Oui en quoi puis-je t'aider. Veux-tu apprendre les ouvertures ? Les règles du jeu ? Les tactiques ?"
    }
    if (texte === 'test') {
        return "Oui faisons un test"
    }
    return "Je n'ai pas la réponse à cette question"
}