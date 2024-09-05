import { NextResponse } from 'next/server';
import { getDatabaseDataXp } from '@/utils/notionUtils';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID_XP;
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID_XP is not defined in environment variables.');
    }
    const data = await getDatabaseDataXp(databaseId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données d\'expérience:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
