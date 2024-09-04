interface eduProps{
    title:string;
    date:string;
}
export default function EduSolo({title,date}:eduProps) {
    return (
        <div className="border border-gray-700 p-6 rounded-lg bg-gray-800 my-4">
                <h4 className="font-medium text-xl mb-2 text-white">{title}</h4>
                <p className="text-gray-400">{date}</p>
            </div>
    )}