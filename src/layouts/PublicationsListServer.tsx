import { getDatabaseDataPublication } from '@/utils/notionUtils';
import PublicationsListClient from './PublicationsListClient';

interface PubData {
  Site: string;
  type: string[];
  lien: string;
}

export const dynamic = 'force-dynamic';

export default async function PublicationsListServer() {
  const databaseId = process.env.NOTION_DATABASE_ID_PUB;

  if (!databaseId) {
    throw new Error('NOTION_DATABASE_ID_PUB is not defined in environment variables.');
  }

  try {
    const data: PubData[] = await getDatabaseDataPublication(databaseId);
    // Passer toutes les infos (Site, type, lien)
    const publications = data.map(item => ({
      url: item.lien,
      title: item.Site,
      type: item.type
    }));
    return <PublicationsListClient initialPublications={publications} />;
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return <div>Une erreur s&#39;est produite lors du chargement des publications.</div>;
  }
}
