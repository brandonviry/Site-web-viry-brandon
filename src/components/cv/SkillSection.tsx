'use client'
interface skillProps{
    skills: string[];
}
export default function SkillsSection({skills}:skillProps) {
    
    
    return (
        <article className="mb-12">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Compétences</h3>
            <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                    <span key={skill} className="bg-blue-900 text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                        {skill}
                    </span>
                ))}
            </div>
        </article>
    );
}
