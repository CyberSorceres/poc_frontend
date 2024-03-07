export const generateUserStories = async (description: string) => {
  const prompt = `Prompt: Generate una lista di user stories in formato JSON, con un field 'title' e uno 'descript' per la descrizione.
Esempio: 'Login e registrazione utente' -> [{
"title": "Login", "descript": "Da utente non loggato, Voglio loggare, Per recuperare i miei dati"
},
{
"title": "Registra",
"descript": "Da utente non loggato, Voglio registrarmi, Per salvare i miei dati se non ho un account"
}].
Parti dalla descrizione di questa epic story: ${description}
Response:`;
  return (
    await (
      await fetch(
        `${import.meta.env.VITE_API_URL}/bedrock?message=${encodeURI(prompt)}`,
      )
    ).json()
  ).results[0].outputText;
};
