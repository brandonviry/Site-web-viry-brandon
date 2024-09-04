import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function ajouterPageALaBaseDeDonnees(nom: string, email: string, message: string) {
  try {
    const reponse = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID! },
      properties: {
        name: {
          title: [{ text: { content: nom } }],
        },
        email: {
          email
        },
        message: {
          rich_text: [{ text: { content: message } }],
        },
      },
    });

    return reponse;
  } catch (erreur) {
    console.error('Erreur lors de l\'ajout à Notion :', erreur);
    throw erreur;
  }
}


