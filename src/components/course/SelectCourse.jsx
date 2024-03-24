import Swal from "sweetalert2";
import apiPut from "../../api/apiPut";
import useAuth from "../../hooks/useAuth";
import useCourse from "../../hooks/useCourse";
import { getDateStringFormat } from "../../utils/funciones";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Select,
  SelectItem,
  useDisclosure,
  Button,
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

  // // estado del select
  // const [selectedLetter, setSelectedLetter] = useState(
  //   new Set(value ? [value] : [])
  // );

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

    onOpen();

    // variable para la fecha de la asignación de curso
    let dateOfAssignment;
    let dischargeDate;

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

      //   const { value: formDate } = await Swal.fire({
      //     title: `Fecha de ${dateAssignmentText}`,
      //     html: `
      //     <div class="flex">
      //       <div class="relative flex flex-col text-left">
      //         <label for="swal-fechaAlta" class="relative pl-10">Fecha de alta</label>
      //         <input type="date" id="swal-fechaAlta" class="swal2-input input-date">
      //       </div>

      //       <div class="relative flex flex-col text-left">
      //         <label for="swal-fechaBaja" class="relative pl-10">Fecha de alta</label>
      //         <input type="date" id="swal-fechaBaja" class="swal2-input input-date">
      //       </div>
      //     </div>
      //     `,
      //     focusConfirm: false,
      //     width: 630,
      //     preConfirm: () => {
      //       if (
      //         !document.getElementById("swal-fechaAlta").value ||
      //         !document.getElementById("swal-fechaBaja").value
      //       ) {
      //         Swal.showValidationMessage("Revise las fechas!");
      //       }

      //       return {
      //         fechaAlta: document.getElementById("swal-fechaAlta").value,
      //         fechaBaja: document.getElementById("swal-fechaBaja").value,
      //       };
      //     },
      //   });

      //   const { fechaAlta, fechaBaja } = formDate;
      //   console.log(fechaAlta);
      //   console.log(fechaBaja);
    }

    // cancelacion de la asignación de fecha y curso
    if (!date) return;

    // asignación de la fecha ingresada
    dateOfAssignment = date.replace(/-/g, "/");

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

  // ======================================================= >>
  // nuevo codigo para trabajar con modal de nextUI
  const [values, setValues] = useState({
    selectedLetter: new Set(value ? [value] : []),
    temporarilySelectedLetter: new Set([]),
    admissionDate: "",
    invalidAdmissionDate: false,
    withdrawalDate: "",
    invalidWithdrawalDate: false,
  });

  // estados para el manejo del modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const updateValues = useCallback((newValue) => {
    setValues((prevValue) => ({ ...prevValue, ...newValue }));
  }, []);

  const handlerSelectedLetter = (letter) => {
    // condición para lanzar error por falta de privilegios
    if (!["1", "4"].includes(authPrivilege)) {
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

    // actualizar valores y resetear estados
    updateValues({
      temporarilySelectedLetter: letter,
      admissionDate: "",
      invalidAdmissionDate: false,
      withdrawalDate: "",
      invalidWithdrawalDate: false,
    });

    // abrir modal para selección de fechas
    if (classStartDate < currentDate) {
      onOpen();
      return;
    }

    console.log("actualización y asignación de curso con fechas base");

    // if (classStartDate > currentDate) {
    //   // asignación de la fecha de ingreso
    //   updateValues({ admissionDate: getDateStringFormat(classStartDate) });
    //   return;

    //   // peticion put para registrar las fechas de ingreso
    //   // para cuando aún no se cierran las nominas de curso
    // } else {
    //   // se abre el modal para la seleccion de fechas
    //   onOpen();
    // }
  };

  const handlerSelectedDate = async ({ onClose }) => {
    if (!values.admissionDate) updateValues({ invalidAdmissionDate: true });
    if (!values.withdrawalDate) updateValues({ invalidWithdrawalDate: true });

    if (!values.admissionDate || !values.withdrawalDate) {
      console.log("Es necesario revisar las fechas");
      return;
    }

    // petición put y actualización del valor del select
    apiPut({
      route: "course/updateLetterCourse",
      object: {
        idMatricula,
        curso: values.temporarilySelectedLetter,
        periodo: authPeriodo,
        fechaAlta: values.admissionDate,
        fechaBaja: values.withdrawalDate,
      },
    })
      .then((response) => {
        console.log(response);
        const assignedCourse = response?.data?.curso;
        const assignedListNumber = response?.data?.numero_lista ?? "-";

        // actualización del array del sistema
        updateDataCourse({
          // actualización de los datos base
          course: updatedArray({
            dataArray: course,
            letter: assignedCourse,
            numberList: assignedListNumber,
            dateString: getDateStringFormat(
              new Date(values.admissionDate),
              true
            ),
          }),
          // actualización de los datos filtrados
          filterCourseContex: updatedArray({
            dataArray: filterCourseContex,
            letter: assignedCourse,
            numberList: assignedListNumber,
            dateString: getDateStringFormat(
              new Date(values.admissionDate),
              true
            ),
          }),
        });

        // actualizacón del state del select
        updateValues([{ selectedLetter: assignedCourse }]);

        // texto del alert tosat
        const textTitle = `Estudiante ${
          !value ? "asignado" : "cambiado"
        } al ${assignedCourse}`;

        // alerta toast al finalizar el cambio/asignación del curso
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

    updateValues({ selectedLetter: [values.temporarilySelectedLetter] });
    // console.log(values);
    onClose();
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
        // onSelectionChange={(e) => testHandleSelect(e.currentKey)}
        onSelectionChange={(e) => handlerSelectedLetter(e.currentKey)}
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
        size="lg"
      >
        <ModalContent className="relatice p-2 bg-gray-100">
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl px-4 py-3">
                Asignación de curso
              </ModalHeader>
              <ModalBody className="w-full rounded-md px-2">
                <div className="relative flex gap-6 border rounded-xl py-6 p-6">
                  <Input
                    type="date"
                    label="Fecha de baja"
                    labelPlacement="outside"
                    variant="faded"
                    isInvalid={values.invalidWithdrawalDate}
                    value={values.withdrawalDate.replace(/\//g, "-")}
                    onValueChange={(e) =>
                      updateValues({ withdrawalDate: e.replace(/-/g, "/") })
                    }
                    classNames={{
                      label: "text-lg",
                      input: ["text-lg"],
                    }}
                  />

                  <Input
                    type="date"
                    label="Fecha de alta"
                    labelPlacement="outside"
                    variant="faded"
                    isInvalid={values.invalidAdmissionDate}
                    value={values.admissionDate.replace(/\//g, "-")}
                    onValueChange={(e) =>
                      updateValues({ admissionDate: e.replace(/-/g, "/") })
                    }
                    classNames={{
                      label: "text-lg",
                      input: ["text-lg"],
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="w-full px-2">
                <div className="flex gap-4">
                  <Button
                    className="w-[8rem] text-lg"
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="w-[8rem] text-lg"
                    color="primary"
                    onPress={() => handlerSelectedDate({ onClose })}
                  >
                    Asignar
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectCourse;
