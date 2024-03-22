import Swal from "sweetalert2";
import apiPut from "../../api/apiPut";
import useAuth from "../../hooks/useAuth";
import useCourse from "../../hooks/useCourse";
import { getDateStringFormat } from "../../utils/funciones";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback, useState } from "react";

const SelectCourse = ({
  idMatricula,
  grado,
  value,
  estado,
  updateStateCourse,
}) => {
  // variabels de contexto global
  const { authPeriodo, authPrivilege, authClassStartDate } = useAuth();
  const { course, filterCourseContex, listCourseForGrade, updateDataCourse } =
    useCourse();

  // datos para trabajar fecha de asignacion de curso
  const currentDate = new Date(getDateStringFormat(new Date()));
  const classStartDate = new Date(authClassStartDate);

  // variables para uso del modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // // estado del select
  // const [selectedLetter, setSelectedLetter] = useState(
  //   new Set(value ? [value] : [])
  // );

  // estados para el control de valores relacionados con la asignación de cursos
  const [values, setValues] = useState({
    selectedLetter: new Set(value ? [value] : []),
    retirementDate: "",
    admissionDate: "",
  });

  // actualizador de los valores de estado para la asignación de cursos
  const updateValues = useCallback((newValue) => {
    setValues((prevValue) => ({ ...prevValue, ...newValue }));
  }, []);

  // función para obtener la lista del curso, según el grado
  const listLetter = (grade) => {
    const list = listCourseForGrade.find((item) => item.grado === grade);

    // condición para la obtención de la lista de cursos
    if (grade) return JSON.parse(list?.letra);

    return [];
  };

  // asignación de la lista de elementos para el select
  const selectLetter = listLetter(grado) || [];

  // función para actualizar array de course y filtro con nuevas letras de curso
  const updatedArray = ({ dataArray, letter, numberList, dateString }) => {
    const newArray = dataArray.map((item) => {
      if (item.id === idMatricula) {
        return {
          ...item,
          curso: letter,
          n_lista: numberList,
          fecha_alta: dateString,
        };
      }
      return item;
    });

    return newArray;
  };

  // función onchange para manejar la logica al cambiar la letra dentro de un grado
  const handleChange = async (letter) => {
    // privilegios permitidos para asignar/cambiar curso
    const acceptedPrivilege = ["1", "4"];

    // condición para lanzar error por falta de privilegios
    if (!acceptedPrivilege.includes(authPrivilege)) {
      updateStateCourse({
        errorCourse: { message: "Advertencia: Privilegios insuficientes !" },
      });
      return;
    }

    // comprobar estado de la matricula, para poder hacer la asignación o cambio
    if (estado === "RETIRADO (A)") {
      updateStateCourse({
        errorCourse: { message: "Advertencia: Estudiante retirado !" },
      });
      return;
    }

    // variable para la fecha de la asignación de curso
    let dateOfAssignment;

    // condición para manejar solicitud de fecha de asignación
    if (classStartDate > currentDate) {
      // La asignación de curso se hace con la fecha de inicio de clases
      dateOfAssignment = getDateStringFormat(classStartDate);
    } else {
      // Texto informativo para la asignación de fecha
      const dateAssignmentText = !value ? "asignación" : "cambio";

      // modal para solicitar fecha de asignacion
      const { value: date } = await Swal.fire({
        title: `Fecha de ${dateAssignmentText}`,
        input: "date",
        showCancelButton: true,
        confirmButtonText: "Asignar",
        cancelButtonText: "Cancelar",
        width: 350,
        allowOutsideClick: false,
        preConfirm: (value) => {
          if (!value) {
            Swal.showValidationMessage("Seleccionar fecha válida!");
          }
        },
        customClass: {
          input: "input-date", // clase personalizada desde main.css
        },
      });

      // cancelacion de la asignación de fecha y curso
      if (!date) return;

      // asignación de la fecha ingresada
      dateOfAssignment = date.replace(/-/g, "/");
    }

    // petición put
    apiPut({
      route: "course/updateLetterCourse",
      object: {
        idMatricula: idMatricula,
        curso: letter,
        periodo: authPeriodo,
        fechaAlta: dateOfAssignment,
      },
    })
      .then((response) => {
        const cursoAsignado = response?.data?.curso;
        const numeroListaAsignado = response?.data?.numero_lista ?? "-";

        // actualización del array del sistema
        updateDataCourse({
          course: updatedArray({
            dataArray: course,
            letter: letter,
            numberList: numeroListaAsignado,
            dateString: getDateStringFormat(new Date(dateOfAssignment), true),
          }),
          filterCourseContex: updatedArray({
            dataArray: filterCourseContex,
            letter: letter,
            numberList: numeroListaAsignado,
            dateString: getDateStringFormat(new Date(dateOfAssignment), true),
          }),
        });

        // actualización del state del curso para el select
        setSelectedLetter([letter]);

        // texto a mostrar en el toast
        const textTitle = `Estudiante ${
          !value ? "asignado" : "cambiado"
        } al ${cursoAsignado}`;
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: textTitle,
        });
      })
      .catch((error) => {
        updateStateCourse({ errorCourse: error });
      });
  };

  const testHandleSelect = (letter) => {
    updateValues({ selectLetter: letter });
    onOpen();
  };

  const testHandleSubmit = async () => {
    console.log("curso: ".values.selectedLetter);
  };

  return (
    <>
      <Select
        aria-label
        placeholder="---"
        size="sm"
        variant="faded"
        color="success"
        selectedKeys={values.selectedLetter}
        // onSelectionChange={(e) => handleChange(e.currentKey)}
        onSelectionChange={(e) => testHandleSelect(e.currentKey)}
      >
        {selectLetter.map((letter) => (
          <SelectItem key={letter} value={letter}>
            {letter}
          </SelectItem>
        ))}
      </Select>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        isDismissable={false}
        backdrop="blur"
        size="sx"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Asignación de curso
              </ModalHeader>
              <ModalBody className="">
                <div className="flex gap-4 border rounded-xl p-4">
                  <Input
                    type="date"
                    label="Fecha de baja"
                    labelPlacement="outside"
                    variant="faded"
                    value={values.retirementDate}
                    onValueChange={(e) => updateValues({ retirementDate: e })}
                  />

                  <Input
                    type="date"
                    label="Fecha de alta"
                    labelPlacement="outside"
                    variant="faded"
                    value={values.admissionDate}
                    onValueChange={(e) => updateValues({ admissionDate: e })}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    testHandleSubmit();
                    onClose();
                  }}
                >
                  Asignar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectCourse;
