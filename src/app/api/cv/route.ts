import { NextResponse } from 'next/server';
import { getDatabaseDataProfil } from '@/utils/notionUtils';

export async function GET() {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID_CV;
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID_CV is not defined in environment variables.');
    }
    const data = await getDatabaseDataProfil(databaseId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données du profil:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
