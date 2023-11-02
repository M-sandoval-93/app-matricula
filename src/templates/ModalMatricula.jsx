import { useEffect, useState } from "react";
import Modal from "./Modal";
import FormMatricula from "./forms/FormMatricula";
import FormStudent from "./forms/FormStudent";
import FormRepresentative from "./forms/FormRepresentative";

const ModalMatricula = ({
  stateModal,
  onCloseModal,
  newMatricula,
  dataMatricula,
}) => {
  const [modalMatricula, setModalMatricula] = useState({
    rut: "",
    formMatricula: true,
    formStudent: false,
    formRepresentative: false,
    editSubForm: false,
  });

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

  const setFormStudent = () => {
    setModal((prev) => ({
      ...prev,
      formMatricula: false,
      formStudent: true,
    }));
  };

  const setFormRepresentative = () => {
    setModal((prev) => ({
      ...prev,
      formMatricula: false,
      formRerpesentative: true,
    }));
  };

  const setEditSubForm = () => {
    setModal((prev) => ({
      ...prev,
      editSubForm: true,
    }));
  };

  // Para controlar que cada vez que se habra el formulario, el estado este correcto
  useEffect(() => {
    if (stateModal) {
      updateModalMatricula({
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
          onCloseModal={onCloseModal}
          newMatricula={newMatricula}
          dataMatricula={dataMatricula}
          // formMatricula={modal.formMatricula}
          // setFormMatricula={setFormMatricula}
          // setFormStudent={setFormStudent}
          // setFormRepresentative={setFormRepresentative}
          // setRut={setRut}
          // setEditSubForm={setEditSubForm}
          // // modalNewMatricula={modalNewMatricula}
          // newMatricula={newMatricula}
        />
      </section>

      {/* <section className={`${modal.formStudent ? "block" : "hidden"} h-full`}>
        <FormStudent
          setFormMatricula={setFormMatricula}
          rut={rut}
          editSubForm={modal.editSubForm}
          stateModalStudent={modal.formStudent}
        />
      </section> */}

      {/* <section
        className={`${modal.formRerpesentative ? "block" : "hidden"} h-full`}
      >
        <FormRepresentative setFormMatricula={setFormMatricula} rut={rut} />
      </section> */}
    </Modal>
  );
};

export default ModalMatricula;
