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



    const titre =
      properties.titre?.type === "title" && properties.titre.title.length > 0
        ? getRichTextContent(properties.titre.title)
        : "Untitled";

    const description =
      properties.description?.type === "rich_text" &&
      properties.description.rich_text.length > 0
        ? getRichTextContent(properties.description.rich_text)
        : "-";

    const image =
      properties.image?.type === "rich_text" &&
      properties.image.rich_text.length > 0
        ? getRichTextContent(properties.image.rich_text)
        : "https://placehold.co/1080x720/png";

    const lien =
      properties.lien?.type === "rich_text" &&
      properties.lien.rich_text.length > 0
        ? getRichTextContent(properties.lien.rich_text)
        : "#";

    return {  titre , description, image, lien };
  });



  return data;
}
