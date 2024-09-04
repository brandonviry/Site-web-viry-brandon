'use client'
interface eduPropsSection{
    ed:Array<{title:string,date:string}>;
}

import EduSolo from '@/components/eduSolo';
export default function EducationSection({ed}:eduPropsSection) {
    return (
        <article className="mb-12">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Éducation</h3>
            {
                ed.map((educ:{title:string,date:string}) => (
                    <EduSolo key={educ.title} title={educ.title} date={educ.date} />
                ))
            }
        </article>
    );
}
