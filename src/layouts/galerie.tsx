import Projet from "@/components/projet"
import { getDatabaseDataGalerie } from '../utils/notionUtils';


interface GalerieData {
   
    titre: string;
    description: string;
    image: string;
    lien: string;
 
  }
  
export default async function Galerie() {
    const databaseId = process.env.NOTION_DATABASE_ID_PROJET;
  
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID is not defined in environment variables.');
    }
  
    const data:GalerieData[] = await getDatabaseDataGalerie(databaseId);

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {data.map((projet:GalerieData, index:number) => {
                return (
                    <Projet
                        key={index}
                        titre={projet.titre}
                        description={projet.description}
                        image={projet.image}
                        lien={projet.lien}
                    />
                )
            })
        }</section>
    )
}