import { useEffect, useState } from "react";
import Modal from "./Modal";
import FormMatricula from "./forms/FormMatricula";
import FormStudent from "./forms/FormStudent";
import FormRepresentative from "./forms/FormRepresentative";

const ModalMatricula = ({ stateMatricula, onCloseModal }) => {
  const {stateModal, newMatricula, idMatricula} = stateMatricula; // estados para modulo matricula

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

  // const [rut, setRut] = useState("");
  // const [modal, setModal] = useState({
  //   formMatricula: true,
  //   formStudent: false,
  //   formRerpesentative: false,
  //   editSubForm: false,
  // });

  // const setFormMatricula = () => {
  //   setModal((prev) => ({
  //     ...prev,
  //     formMatricula: true,
  //     formStudent: false,
  //     formRerpesentative: false,
  //     editSubForm: false,
  //   }));
  // };

  // const setFormStudent = () => {
  //   setModal((prev) => ({
  //     ...prev,
  //     formMatricula: false,
  //     formStudent: true,
  //   }));
  // };

  // const setFormRepresentative = () => {
  //   setModal((prev) => ({
  //     ...prev,
  //     formMatricula: false,
  //     formRerpesentative: true,
  //   }));
  // };

  // const setEditSubForm = () => {
  //   setModal((prev) => ({
  //     ...prev,
  //     editSubForm: true,
  //   }));
  // };

  // Para controlar que cada vez que se habra el formulario, el estado este correcto
  useEffect(() => {
    if (stateModal) {
      updateModalMatricula({
        rut: "",
        formMatricula: true,
        formStudent: false,
        formRepresentative: false,
        editSubForm: false,
      });
    }
  }, [stateModal]);

  return (
    <Modal
      title={
        (modalMatricula.formMatricula && "REGISTRO MATRÍCULA") ||
        (modalMatricula.formStudent && "REGISTRO ESTUDIANTE") ||
        (modalMatricula.formRepresentative && "REGISTRO APODERADO(A)")
      }
      stateModal={stateModal}
      onCloseModal={onCloseModal}
    >
      <section
        className={`relative h-full 
          ${modalMatricula.formMatricula ? "block" : "hidden"}`}
      >
        <FormMatricula
          stateModal={stateModal}
          newMatricula={newMatricula}
          idMatricula={idMatricula}
          onCloseModal={onCloseModal}
          updateModalMatricula={updateModalMatricula}
          stateModalMatricula={modalMatricula.formMatricula}
        />
      </section>

      <section className={`${modalMatricula.formStudent ? "block" : "hidden"} h-full`}>
        <FormStudent
          updateModalMatricula={updateModalMatricula}
          rut={modalMatricula.rut}
          editSubForm={modalMatricula.editSubForm}
          stateModalStudent={modalMatricula.formStudent}
          // setFormMatricula={setFormMatricula}
          // rut={rut}
          // editSubForm={modal.editSubForm}
          // stateModalStudent={modal.formStudent}
        />
      </section>

      {/* <section
        className={`${modal.formRerpesentative ? "block" : "hidden"} h-full`}
      >
        <FormRepresentative setFormMatricula={setFormMatricula} rut={rut} />
      </section> */}
    </Modal>
  );
};

export default ModalMatricula;
