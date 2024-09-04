import { Client } from "@notionhq/client";
import { PageObjectResponse, TitlePropertyItemObjectResponse, RichTextPropertyItemObjectResponse, MultiSelectPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

function isPageObjectResponse(obj: any): obj is PageObjectResponse {
  return obj.object === "page" && "properties" in obj;
}

function isTitleProperty(property: any): property is TitlePropertyItemObjectResponse {
  return property.type === "title";
}

function isRichTextProperty(property: any): property is RichTextPropertyItemObjectResponse {
  return property.type === "rich_text";
}

function isMultiSelectProperty(property: any): property is MultiSelectPropertyItemObjectResponse {
  return property.type === "multi_select";
}

function getRichTextContent(richTextItems: { type: string; text?: { content: string } }[]): string {
  return richTextItems
    .map((item) => (item.type === "text" && item.text ? item.text.content : ""))
    .join("");
}

async function queryDatabase(databaseId: string) {
  return await notion.databases.query({ database_id: databaseId });
}

export async function getDatabaseDataProfil(databaseId: string) {
  const response = await queryDatabase(databaseId);
  return response.results.filter(isPageObjectResponse).map((page) => {
    const properties = page.properties;
    return {
      description: isTitleProperty(properties.description) ? getRichTextContent(properties.description.title) : "Untitled",
      CompTechnique: isMultiSelectProperty(properties.CompTechnique) ? properties.CompTechnique.multi_select.map(item => item.name) : [],
      lang: isMultiSelectProperty(properties.lang) ? properties.lang.multi_select.map(item => item.name) : []
    };
  });
}

export async function getDatabaseDataXp(databaseId: string) {
  const response = await queryDatabase(databaseId);
  return response.results.filter(isPageObjectResponse).map((page) => {
    const properties = page.properties;
    return {
      titre: isTitleProperty(properties.titre) ? getRichTextContent(properties.titre.title) : "Untitled",
      Date: isRichTextProperty(properties.Date) ? getRichTextContent(properties.Date.rich_text) : "-",
      tache: isMultiSelectProperty(properties.tache) ? properties.tache.multi_select.map(item => item.name) : []
    };
  });
}

export async function getDatabaseDataEdu(databaseId: string) {
  const response = await queryDatabase(databaseId);
  return response.results.filter(isPageObjectResponse).map((page) => {
    const properties = page.properties;
    return {
      Nom: isTitleProperty(properties.Nom) ? getRichTextContent(properties.Nom.title) : "Untitled",
      Date: isRichTextProperty(properties.Date) ? getRichTextContent(properties.Date.rich_text) : "-"
    };
  });
}

export async function getDatabaseDataGalerie(databaseId: string) {
  const response = await queryDatabase(databaseId);
  return response.results.filter(isPageObjectResponse).map((page) => {
    const properties = page.properties;
    return {
      titre: isTitleProperty(properties.titre) ? getRichTextContent(properties.titre.title) : "Untitled",
      description: isRichTextProperty(properties.description) ? getRichTextContent(properties.description.rich_text) : "-",
      image: isRichTextProperty(properties.image) ? getRichTextContent(properties.image.rich_text) : "https://placehold.co/1080x720/png",
      lien: isRichTextProperty(properties.lien) ? getRichTextContent(properties.lien.rich_text) : "#"
    };
  });
}

export async function getDatabaseDataPublication(databaseId: string) {
  const response = await queryDatabase(databaseId);
  return response.results.filter(isPageObjectResponse).map((page) => {
    const properties = page.properties;
    return {
      Site: isTitleProperty(properties.Site) ? getRichTextContent(properties.Site.title) : "Untitled",
      lien: isRichTextProperty(properties.lien) ? getRichTextContent(properties.lien.rich_text) : "/"
    };
  });
}
