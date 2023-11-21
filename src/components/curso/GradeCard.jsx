const GradeCard = ({grade, level}) => { 
    return (
        <article className="relative flex border-blue-500 rounded-md border px-3 py-1 items-center">
            <span className="text-[2.2rem] text-blue-600 font-bold">{grado}</span>
            <div className="flex flex-col pl-3">
                <span className="w-full text-md text-blue-600">{nivel}</span>
                <span className="w-full text-lg text-blue-400 flex items-end justify-end">93</span>
            </div>
        </article>
    )
 }

 export default GradeCard;