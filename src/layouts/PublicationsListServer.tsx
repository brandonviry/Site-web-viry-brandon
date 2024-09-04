import { getDatabaseData } from '@/app/api/publication/route';
import PublicationsListClient from './PublicationsListClient';

interface PubData {
  Site: string;
  lien: string;
}

export default async function PublicationsListServer() {
  const databaseId = process.env.NOTION_DATABASE_ID_PUB;
  
  if (!databaseId) {
    throw new Error('NOTION_DATABASE_ID is not defined in environment variables.');
  }

  try {
    const data: PubData[] = await getDatabaseData(databaseId);
    const uniquePublications = Array.from(new Set(data.map(item => item.lien)))
      .map(url => ({ url }));
    return <PublicationsListClient initialPublications={uniquePublications} />;
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return <div>Une erreur s'est produite lors du chargement des publications.</div>;
  }
}
