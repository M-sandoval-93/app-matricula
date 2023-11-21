import HeaderTitle from "../HeaderTitle"
import GradeCard from "./GradeCard";

const HeaderCurso = () => { 
    return (
        <HeaderTitle title={"Regitro cursos"}>
            <section className="w-full flex-wrap sm:flex-nowrap sm:w-1/2 relative flex items-center justify-center sm:justify-end gap-4 xs:px-2">
                <GradeCard grade={"7°"} level={"Básico"} />


                
            </section>
        </HeaderTitle>
    )
 }

 export default HeaderCurso;