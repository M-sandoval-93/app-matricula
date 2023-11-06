import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { getNameStudent, stringFormat } from "../../utils/funciones";
import useMatricula from "../../hooks/useMatricula";

const RutName = ({
  labelRut,
  labelName,
  rut,
  dvRut,
  name,
  values,
  handleChange,
  touched,
  errors,
  setError,
  handleBlur,
  setFieldValue,
  setId,
  route,
  property,
  type,
  showForm,
  setRut,
}) => {
  const { proceso_matricula } = useMatricula();
  const getRut = () => {
    setRut(values[rut]);
    showForm();
  };

  return (
    <section className="relative flex flex-col md:flex-row gap-4 items-center">
      <article className="relative flex flex-col gap-y-2 w-full md:w-64">
        <label className="text-blue-600 font-semibold" htmlFor="rut_estudiante">
          {labelRut}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            name={rut}
            id={rut}
            autoComplete="off"
            value={values[rut]}
            onChange={(val) =>
              handleChange(
                getNameStudent({
                  val: val,
                  setFieldValue: setFieldValue,
                  inputDv: dvRut,
                  inputNombre: name,
                  setError: setError,
                  route: route,
                  setId: setId,
                  property: property,
                })
              )
            }
            onBlur={handleBlur}
            className={`border outline-none rounded-md p-2 text-center w-full xs:w-36 
                      ${
                        touched[rut] &&
                        (errors[rut] || errors[name]) &&
                        "border-red-500"
                      }
                      ${
                        touched[rut] &&
                        (!errors[rut] || !errors[name]) &&
                        "border-green-500"
                      }
                    `}
          />

          <span className="text-lg font-bold"> - </span>

          <input
            type="text"
            name={dvRut}
            id={dvRut}
            autoComplete="off"
            disabled
            value={values[dvRut]}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`border outline-none rounded-md p-2 text-center w-12 bg-gray-200`}
          />

          <button
            type="button"
            onClick={getRut}
            className={`flex items-center justify-center p-1 rounded-full text-white 
                      transition-[opacity,background-color] duration-300
                      ${
                        values[name] === "" ||
                        values[name] === "Asignar apoderado(a) titular !" ||
                        values[name] === "Asignar apoderado(a) suplente !" ||
                        (values[name] === `Sin registro de ${type} !` &&
                          proceso_matricula)
                          ? "opacity-0 invisible"
                          : "opacity-100 visible"
                      }
                      ${
                        values[name] === `Sin registro de ${type} !` &&
                        !proceso_matricula
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }
            `}
          >
            {values[name] === `Sin registro de ${type} !` &&
            !proceso_matricula ? (
              <AddIcon sx={{ fontSize: 22 }} />
            ) : (
              <EditIcon sx={{ fontSize: 22 }} />
            )}
          </button>
        </div>
      </article>

      <article className="relative flex flex-col gap-y-2 w-full md:grow">
        <label className="text-blue-600 font-semibold" htmlFor={name}>
          {labelName}
        </label>
        <div className="flex items-center">
          <input
            type="text"
            name={name}
            id={name}
            autoComplete="off"
            disabled
            value={values[name]}
            onChange={(val) => handleChange(stringFormat(val))}
            onBlur={handleBlur}
            className={`border outline-none rounded-md p-2 w-full bg-gray-200
                    transition-all duration-300`}
          />
        </div>
      </article>
    </section>
  );
};

export default RutName;
