import { NextResponse } from 'next/server';
import { getDatabaseDataGalerie } from '@/utils/notionUtils';

export async function GET() {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID_PROJET;
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID_GALERIE is not defined in environment variables.');
    }
    const data = await getDatabaseDataGalerie(databaseId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de la galerie:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
