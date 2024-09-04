import ProfileSection from '@/components/cv/ProfilSelection';
import ExperienceSection from '@/components/cv/ExperienceSection';
import EducationSection from '@/components/cv/EducationSection';
import SkillsSection from '@/components/cv/SkillSection';
import LanguagesSection from '@/components/cv/LanguagesSection';
import { getDatabaseDataProfil } from '../app/api/cv/route';
import { getDatabaseDataXp } from '../app/api/xp/route';
import { getDatabaseDataEdu } from '../app/api/edu/route';
import { console } from 'inspector';

interface ProfilData {
    description: string;
    CompTechnique: string[];
    lang: string[];

}

interface XpData {
    titre: string;
    Date: string;
    tache: string[];
}

interface EduData {
    Nom:string;
    Date:string;
}


export default async function Containt1() {

    const databaseId: string[] = [process.env.NOTION_DATABASE_ID_CV as string, process.env.NOTION_DATABASE_ID_XP as string ,process.env.NOTION_DATABASE_ID_EDU as string];

    for (const id of databaseId) {
        if (!id) {
            throw new Error('NOTION_DATABASE_ID is not defined in environment variables.');
        }
    }

    const cv: ProfilData[] = await getDatabaseDataProfil(databaseId[0]);
    const xp: XpData[] = (await getDatabaseDataXp(databaseId[1]))
    const edu: EduData[] = (await getDatabaseDataEdu(databaseId[2]))


    return (
        <section className="w-full text-gray-100 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-white">Profil Professionnel</h2>
                <ProfileSection description={cv[0].description} />
                <ExperienceSection exp={xp.map((xpsolo: XpData) => {
                    return ({ title: xpsolo.titre, date: xpsolo.Date, taches: xpsolo.tache })
                })} />
                <EducationSection ed={edu.map((edusolo: EduData) => {
                    return ({ title: edusolo.Nom, date: edusolo.Date })
                })}/>
                <SkillsSection skills={cv[0].CompTechnique} />
                <LanguagesSection lang={cv[0].lang} />
            </div>
        </section>
    );
}
