interface expPropsSolo{
    title:string;
    date:string;
    taches:string[]
}

export default function ExpSolo({title,date,taches}:expPropsSolo) {
    return (
        <>
        <h4 className="font-medium text-xl mb-2 text-white">{title}</h4>
        <p className="text-gray-400 mb-4">{date}</p>
        <ul className="list-disc list-inside text-gray-300">
       {
         taches.map((tache) => (
            <li key={tache}>{tache}</li>
        ))
       }
        </ul>
        </>
    )
}