'use client'
interface lang {
    lang: string[];
}
export default function LanguagesSection({lang}:lang) {
    return (
        <article>
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Compétences Linguistiques</h3>
            <ul className="list-disc list-inside text-gray-300 text-lg">
                {
                 lang.map((lg:string) => (
                    <li key={lg}>{lg}</li>
                ))
                }
            </ul>
        </article>
    );
}
