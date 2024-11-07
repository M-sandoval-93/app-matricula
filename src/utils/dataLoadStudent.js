import axios from "axios";

// link del sheet de prematricula
// const SHEETDB_ENDPOINT= "https://docs.google.com/spreadsheets/d/e/2PACX-1vQzBzrf7aMmvI7ygj_vB-N7Rxdmp-0M3rVffmMz_zMs3hsC9aMHGyufzEbcEhqa_TfwKsjNIg9DZ39M/pub?gid=136195483&single=true&output=csv";
const SHEETDB_ENDPOINT= "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpUxtuAz1Qps1nBBBVedRkYJMc-dMLOcnGh8LkJCjAxWcVf0SLez8HUefW5RZ9AuD1exZXUdy_-Bdm/pub?output=csv";

// loader para cargar datos de prematricula
export const dataLoader = async ({updateStateMatricula, updateDataMatricula}) => {
    try {
        // petición axios
        const response = await axios.get(SHEETDB_ENDPOINT);

        // Datos en CSV
        const csvData = response.data;

        // Separar las filas por línea
        const csvRows = csvData.split("\n").map(row => row.trim());

        // Obtener los encabezados
        const headers = csvRows[0].split(",");

        // Procesar cada fila en un objeto
        const entryData = csvRows.slice(1) // Ignorar la primera fila (encabezados)
            .filter(row => row)             // Eliminar filas vacías
            .map(row => {
                // Dividir cada fila en valores, manejando celdas vacías
                const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); 

                // Asegurar que cada fila tenga el mismo número de elementos que los encabezados
                const rowObject = headers.reduce((obj, header, index) => {
                    // Asignar valor o `null` si el valor está vacío
                    obj[header] = values[index] !== undefined && values[index] !== "" 
                        ? values[index].replace(/(^"|"$)/g, '')  // Remover comillas si existen
                        : null;
                    return obj;
                }, {});

                return rowObject;
            });


        updateDataMatricula({dataFormMatricula: entryData})
        updateStateMatricula({loading: false});

    } catch (error) {
        throw new Error("Error en la carga de datos")
        
    }
}