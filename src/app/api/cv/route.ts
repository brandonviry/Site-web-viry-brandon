import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NextResponse } from 'next/server';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Fonction pour vérifier si l'objet est une page
function isPageObjectResponse(obj: any): obj is PageObjectResponse {
  return "properties" in obj;
}

// Fonction pour obtenir les données de la base de données Notion
export async function GET() {
  try {
    const data = await getDatabaseDataProfil();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données du profil:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

async function getDatabaseDataProfil() {
  const response = await notion.databases.query({ database_id: databaseId });

  const data = response.results.filter(isPageObjectResponse).map((page) => {
    const properties = page.properties;

    // Fonction pour obtenir le contenu du texte riche
    const getRichTextContent = (richTextItems: any[]) => {
      return richTextItems
        .map((item) => (item.type === "text" ? item.text.content : ""))
        .join("");
    };



    const description =
      properties.description?.type === "title" && properties.description.title.length > 0
        ? getRichTextContent(properties.description.title)
        : "Untitled";

    const CompTechnique =
      properties.CompTechnique?.type === "multi_select" &&
      properties.CompTechnique.multi_select.length > 0
        ? properties.CompTechnique.multi_select.map((lang:any) => lang.name)
        : [];

    const lang =
      properties.lang?.type === "multi_select" &&
      properties.lang.multi_select.length > 0
        ? properties.lang.multi_select.map((lang:any) => lang.name)
        : [];

   

    return {  description, CompTechnique, lang };
  });



  return data;
}
