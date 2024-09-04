'use client'
interface profileProps{
    description:string;
}

export default function ProfileSection({description}:profileProps) {
    return (
        <article className="mb-12">
            <div className="border border-gray-700 p-6 rounded-lg bg-gray-800">
                <p className="text-gray-300 text-lg leading-relaxed">
                    {
                        description
                    }      </p>
            </div>
        </article>
    );
}
