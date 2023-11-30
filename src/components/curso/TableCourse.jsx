import { useState } from "react"

const TableCourse = () => {
    // ver las variables grobales que utilizare

    // estado para las variables del modulo de curso
    const [stateCourse, setStateCourse] = useState({
        filter: "", // datos para el filtro de la tabla
        loading: false, // estado de la carga de datos
        error: null, // estado para el control de errores
    });

    // actualizador del estado de las variables del modulo de curso
    const updateStateCouse = (newSate) => {
        setStateCourse((prev) => ({...prev, ...newSate}));
    };

    // efecto inicial para consultar la data de la tabla
    // a la escucha del cambio de periodo seleccionado

    // adicionalmente el efecto debera esta a la escucha de la seleccion del grado y curso
    // con la finalidad de aplicar filtro sobre la data

    // ver si aplico peticiones por cada filtro 


}