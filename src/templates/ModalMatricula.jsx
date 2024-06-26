import { useEffect, useState } from "react";
import Modal from "./Modal";
import FormMatricula from "./forms/FormMatricula";
import FormStudent from "./forms/FormStudent";
import FormRepresentative from "./forms/FormRepresentative";
import useAuth from "../hooks/useAuth";
import ErrorHandler from "../components/ErrorHandler";

const ModalMatricula = ({ stateMatricula, onCloseModal }) => {
  const { stateModalMatricula, newMatricula, idMatricula } = stateMatricula; // estados para modulo matricula

  const { authPrivilege } = useAuth();
  const [error, setError] = useState(null);

  // privilegios permitidos para utilizar el modal
  const acceptedPrivilege = ["1", "2"];

  // estados para trabajar con el modal matricula
  const [modalMatricula, setModalMatricula] = useState({
    rut: "", // rut para nuevo estudiante/apoderado
    formMatricula: true, // estado del formulario de matricula
    formStudent: false, // estado del formulario de estudiante
    formRepresentative: false, // estado del formulario de apoderado
    editSubForm: false, // estado para controlar new/edit de los formularios estudiante/apoderado
  });

  // actualizador de estados
  const updateModalMatricula = (newState) => {
    setModalMatricula((prev) => ({ ...prev, ...newState }));
  };

  // Para controlar que cada vez que se habra el formulario, el estado este correcto
  useEffect(() => {
    if (stateModalMatricula) {
      updateModalMatricula({
        rut: "",
        formMatricula: true,
        formStudent: false,
        formRepresentative: false,
        editSubForm: false,
      });

      if (!acceptedPrivilege.includes(authPrivilege)) {
        onCloseModal();
        setError({ message: "Advertencia: Privilegios insuficientes !" });
      }
    }
  }, [stateModalMatricula]);

  return (
    <Modal
      title={
        (modalMatricula.formMatricula && "REGISTRO MATRÍCULA") ||
        (modalMatricula.formStudent && "REGISTRO ESTUDIANTE") ||
        (modalMatricula.formRepresentative && "REGISTRO APODERADO(A)")
      }
      stateModal={stateModalMatricula}
      onCloseModal={onCloseModal}
      color={"blue"}
    >
      {/* formulario matricula */}
      <section
        className={`relative h-full w-full
          ${modalMatricula.formMatricula ? "block" : "hidden"}`}
      >
        <FormMatricula
          stateModal={stateModalMatricula}
          newMatricula={newMatricula}
          idMatricula={idMatricula}
          onCloseModal={onCloseModal}
          updateModalMatricula={updateModalMatricula}
          stateFormMatricula={modalMatricula.formMatricula}
        />
      </section>

      {/* formulario estudiante */}
      <section
        className={`${modalMatricula.formStudent ? "block" : "hidden"} h-full`}
      >
        <FormStudent
          updateModalMatricula={updateModalMatricula}
          rut={modalMatricula.rut}
          editSubForm={modalMatricula.editSubForm}
          stateFormStudent={modalMatricula.formStudent}
        />
      </section>

      {/* formulario apoderado */}
      <section
        className={`${
          modalMatricula.formRepresentative ? "block" : "hidden"
        } h-full`}
      >
        <FormRepresentative
          updateModalMatricula={updateModalMatricula}
          rut={modalMatricula.rut}
          editSubForm={modalMatricula.editSubForm}
          stateFormRepresentative={modalMatricula.formRepresentative}
        />
      </section>

      <ErrorHandler error={error} />
    </Modal>
  );
};

export default ModalMatricula;
