import { NextResponse } from 'next/server';
import { getDatabaseDataEdu } from '@/utils/notionUtils';

export async function GET() {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID_EDU;
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID_EDU is not defined in environment variables.');
    }
    const data = await getDatabaseDataEdu(databaseId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données d\'éducation:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
