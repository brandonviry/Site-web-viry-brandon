import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Fonction pour vérifier si l'objet est une page
function isPageObjectResponse(obj: any): obj is PageObjectResponse {
  return "properties" in obj;
}

// Fonction pour obtenir les données de la base de données Notion
export async function getDatabaseData(databaseId: string) {
  const response = await notion.databases.query({ database_id: databaseId });

  const data = response.results.filter(isPageObjectResponse).map((page) => {
    const properties = page.properties;

    // Fonction pour obtenir le contenu du texte riche
    const getRichTextContent = (richTextItems: any[]) => {
      return richTextItems
        .map((item) => (item.type === "text" ? item.text.content : ""))
        .join("");
    };



    const Site =
      properties.Site?.type === "title" && properties.Site.title.length > 0
        ? getRichTextContent(properties.Site.title)
        : "Untitled";

    const lien =
      properties.lien?.type === "rich_text" &&
      properties.lien.rich_text.length > 0
        ? getRichTextContent(properties.lien.rich_text)
        : "/";

    return {  Site, lien };
  });



  return data;
}
