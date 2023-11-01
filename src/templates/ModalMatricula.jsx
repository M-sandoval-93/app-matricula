import { useEffect, useState } from "react";
import Modal from "./Modal";
import FormMatricula from "./forms/FormMatricula";
import FormStudent from "./forms/FormStudent";
import FormRepresentative from "./forms/FormRepresentative";

const ModalMatricula = ({ open, onClose, notEditMatricula = false }) => {
  const [rut, setRut] = useState("");
  const [modal, setModal] = useState({
    formMatricula: true,
    formStudent: false,
    formRerpesentative: false,
    editSubForm: false,
  });

  const setFormMatricula = () => {
    setModal((prev) => ({
      ...prev,
      formMatricula: true,
      formStudent: false,
      formRerpesentative: false,
      editSubForm: false,
    }));
  };

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
    if (open) {
      setFormMatricula();
    }
  }, [open]);

  return (
    <Modal
      title={
        (modal.formMatricula && "REGISTRO MATRÍCULA") ||
        (modal.formStudent && "REGISTRO ESTUDIANTE") ||
        (modal.formRerpesentative && "REGISTRO APODERADO(A)")
      }
      open={open}
      onClose={onClose}
    >
      <section
        className={`${
          modal.formMatricula ? "block" : "hidden"
        } relative h-full`}
      >
        <FormMatricula
          open={open}
          onClose={onClose}
          formMatricula={modal.formMatricula}
          setFormMatricula={setFormMatricula}
          setFormStudent={setFormStudent}
          setFormRepresentative={setFormRepresentative}
          setRut={setRut}
          notEditMatricula={modal.notEditMatricula}
          editSubForm={modal.editSubForm}
        />
      </section>

      <section className={`${modal.formStudent ? "block" : "hidden"} h-full`}>
        <FormStudent
          setFormMatricula={setFormMatricula}
          rut={rut}
          setEditSubForm={setEditSubForm}
          stateModalStudent={modal.formStudent}
        />
      </section>

      <section
        className={`${modal.formRerpesentative ? "block" : "hidden"} h-full`}
      >
        <FormRepresentative setFormMatricula={setFormMatricula} rut={rut} />
      </section>
    </Modal>
  );
};

export default ModalMatricula;
