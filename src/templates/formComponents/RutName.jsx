import { MdAdd } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { getName, stringFormat } from "../../utils/funciones";
import ErrorMessageInput from "./ErrorMessageInput";
import useAuth from "../../hooks/useAuth";

const RutName = ({
  labelRut, // label del input rut
  labelName, // label del input name
  grade, // id del input de grado
  rut, // id del input rut
  dvRut, // id del input dv_rut
  name, // id del input nombre
  values, // initial values de formik
  handleChange, // evento change de formik
  touched, // evento touch de formik
  errors, // Errors de validacion con Yup
  handleBlur, // evento blur de formik
  setFieldValue, // setear el valor de los input con formik
  setId, // Setear los id de los estudiantes y/o apoderados
  // route, // ruta donde hacer la peticion de la api
  property, // id a setear en la llamada a la api
  type, // indica el tipo de dato que se trabajara; estudiante, titular, suplente
  updateModalMatricula, // actualizar estados del modal matricula
}) => {
  const { authPeriodo } = useAuth();

  // funcion para obtener el rut para un nuevo ingreso o edicion de estudiante/apoderado
  const getRut = () => {
    // Asignar rut al contexto rut del modal matricula
    updateModalMatricula({ rut: values[rut] });

    // condición para identificar new or edit
    if (values[name] === `Sin registro de ${type} !`) {
      updateModalMatricula({ editSubForm: true });
    } else {
      updateModalMatricula({ editSubForm: false });
    }

    // condición para alternar entre los formularios del modal
    if (type === "estudiante") {
      // mostrar formulario de estudiante
      updateModalMatricula({
        formMatricula: false,
        formStudent: true,
      });
    } else {
      // mostrar formulario de apoderado
      updateModalMatricula({
        formMatricula: false,
        formRepresentative: true,
      });
    }
  };

  return (
    <>
      <section className="relative flex flex-col md:flex-row gap-4 items-center">
        <article className="relative flex flex-col gap-y-2 w-full md:w-64">
          <label className="text-blue-600 font-semibold" htmlFor={`${rut}`}>
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
                  getName({
                    val: val,
                    setFieldValue: setFieldValue,
                    inputGrade: grade,
                    inputDv: dvRut,
                    inputNombre: name,
                    setId: setId,
                    property: property,
                    periodo: authPeriodo,
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
                  }`}
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
                    values[name] === "Asignar estudiante !" ||
                    values[name] === "Asignar estudiante !" ||
                    values[name] === "Asignar apoderado(a) titular !" ||
                    values[name] === "Asignar apoderado(a) suplente !" ||
                    values[name] === "El rut no esta en lista SAE !" ||
                    values[name] === `Sin registro de ${type}`
                      ? "opacity-0 invisible"
                      : "opacity-100 visible"
                  }

                  ${
                    values[name] === `Sin registro de ${type} !`
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
            >
              {values[name] === `Sin registro de ${type} !` ? (
                <MdAdd size={22} />
              ) : (
                <RiEdit2Fill size={22} />
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

      <ErrorMessageInput touched={touched} errors={errors} value={rut} />
      <ErrorMessageInput touched={touched} errors={errors} value={name} />
    </>
  );
};

export default RutName;
