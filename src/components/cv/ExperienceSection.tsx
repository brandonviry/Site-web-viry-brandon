'use client'
interface expProps{
    exp:Array<{title:string,date:string,taches:string[]}>;
}

import ExpSolo from "../expSolo";

export default function ExperienceSection({exp}:expProps) {
    return (
        <article className="mb-12">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Parcours Professionnel</h3>
            <div className="border border-gray-700 p-6 rounded-lg bg-gray-800">
              {
                    exp.map((exp:{title:string,date:string,taches:string[]}) => (
                        <ExpSolo key={exp.title} title={exp.title} date={exp.date} taches={exp.taches} />
                    ))
              }
              
              
                     </div>
        </article>
    );
}

