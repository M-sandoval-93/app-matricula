import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import { MdClear } from "react-icons/md";

const HeaderTableProcessMatricula = ({filter, updateDataProcesoMatricula}) => {
    return (
        <section className="relative w-full flex flex-wrap gap-3 items-center justify-end my-2">
            <article className="flex gap-3">
                <button>
                    <BsFileEarmarkExcelFill size={30} />
                    <div>Descargar datos</div>
                </button>

                <div>
                    <span>
                        <IoSearchSharp size={25} />
                    </span>
                    <input 
                        type="text"
                        placeholder="Search ..."
                        value={filter}
                        // onChange={(event) => actualizar data}
                        className="border outline-none border-gray-300 focus:shadow focus:shadow-gray-400 rounded-md py-2 pl-10" 
                    />

                    <span>
                        <MdClear size={25} />
                    </span>
                </div>

            </article>
        </section>
    );

}

export default HeaderTableProcessMatricula;