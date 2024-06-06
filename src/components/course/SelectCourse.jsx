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
import { Formik } from "formik";
import * as Yup from "yup";

const SelectCourse = ({
  idMatricula,
  grado,
  value,
  estado,
  updateStateCourse,
}) => {
  // variables de contexto global
  const { authPeriodo, authPrivilege, authClassStartDate } = useAuth();
  const { course, filterCourseContex, listCourseForGrade, updateDataCourse } =
    useCourse();

  // datos para trabajar fecha de asignacion de curso
  const currentDate = new Date(getDateStringFormat(new Date()));
  const classStartDate = new Date(authClassStartDate);

  // variables de estado para asignación y cambio de curso
  const [valueLetter, setValueLetter] = useState({
    selectedLetter: new Set(value ? [value] : []),
    temporarilySelectedLetter: new Set([]),
  });

  // actualizador de estados
  const updateValuesLetter = useCallback((newValue) => {
    setValueLetter((prevValue) => ({ ...prevValue, ...newValue }));
  }, []);

  // estados para el manejo del modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  // manejador para la selección de curso en select
  const handlerSelectedLetter = (letter) => {
    // condición para lanzar error por falta de privilegios
    if (!["1", "2"].includes(authPrivilege)) {
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
    updateValuesLetter({
      temporarilySelectedLetter: letter,
    });

    // abrir modal para selección de fechas
    if (classStartDate < currentDate) {
      onOpen();
      return;
    }

    // trabajar
    console.log("actualización y asignación de curso con fechas base");
  };

  // esquema de validación de los campos
  const validationSchema = Yup.object().shape({
    withdrawalDate: Yup.date(),
    admissionDate: Yup.date().required("Fecha de alta requerida !"),
  });

  // manejo de asignación / cambio curso
  const onSubmitSelectedDate =
    (onClose) =>
    ({ withdrawalDate, admissionDate }, { setSubmitting }) => {
      // conversión de las fechas
      const date = {
        withdrawal: withdrawalDate.replace(/-/g, "/"),
        admission: admissionDate.replace(/-/g, "/"),
      };

      try {
        // petición put para la asignación / cambio curso
        apiPut({
          route: "course/updateLetterCourse",
          object: {
            idMatricula,
            curso: valueLetter.temporarilySelectedLetter,
            periodo: authPeriodo,
            fechaBaja: date.withdrawal,
            fechaAlta: date.admission,
          },
        }).then((response) => {
          const assignedCourse = response?.data?.curso;
          const assignedListNumber = response?.data?.numero_lista ?? "-";

          // actualización del array del sistema
          updateDataCourse({
            // actualización de los datos base
            course: updatedArray({
              dataArray: course,
              letter: assignedCourse,
              numberList: assignedListNumber,
              dateString: getDateStringFormat(new Date(date.admission), true),
            }),
            // actualización de los datos filtrados
            filterCourseContex: updatedArray({
              dataArray: filterCourseContex,
              letter: assignedCourse,
              numberList: assignedListNumber,
              dateString: getDateStringFormat(new Date(date.admission), true),
            }),
          });

          // actualización del state del select course
          updateValuesLetter({ selectedLetter: [assignedCourse] });

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
        });
      } catch (error) {
        // captura de error
        updateStateCourse({ errorCourse: error });
      } finally {
        // habilitación del botón luego del envío
        setSubmitting(false);
        onClose();
      }
    };

  return (
    <>
      <Select
        aria-label
        placeholder="---"
        size="sm"
        variant="faded"
        color="success"
        selectedKeys={valueLetter.selectedLetter}
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
            <Formik
              initialValues={{ withdrawalDate: "", admissionDate: "" }}
              validationSchema={validationSchema}
              onSubmit={onSubmitSelectedDate(onClose)}
              validate={(values) => {
                // condición para requerir fecha de baja, solo en cambios de curso
                const errors = {};
                if (!values.withdrawalDate && value) {
                  errors.withdrawalDate = "Fecha de baja requerida !";
                }
                return errors;
              }}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                errors,
                touched,
                handleBlur,
                isSubmitting,
              }) => (
                <>
                  {/* titulo del modal */}
                  <ModalHeader className="text-2xl px-4 py-3">
                    Asignación de curso
                  </ModalHeader>

                  {/* cuerpo del modal */}
                  <ModalBody className="relative w-full rounded-md px-2">
                    <div className="relative flex gap-6 border rounded-xl py-6 p-6">
                      <Input
                        name="withdrawalDate"
                        type="date"
                        label="Fecha de baja"
                        labelPlacement="outside"
                        variant="faded"
                        value={values.withdrawalDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.withdrawalDate &&
                          errors.withdrawalDate &&
                          true
                        }
                        errorMessage={
                          touched.withdrawalDate &&
                          errors.withdrawalDate &&
                          "Fecha requerida !"
                        }
                        classNames={{
                          label: "text-lg",
                          input: ["text-lg"],
                        }}
                        isDisabled={!value}
                      />

                      <Input
                        name="admissionDate"
                        type="date"
                        label="Fecha de alta"
                        labelPlacement="outside"
                        variant="faded"
                        value={values.admissionDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.admissionDate && errors.admissionDate && true
                        }
                        errorMessage={
                          touched.admissionDate &&
                          errors.admissionDate &&
                          "Fecha requerida !"
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
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                      >
                        Asignar
                      </Button>
                    </div>
                  </ModalFooter>
                </>
              )}
            </Formik>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectCourse;
