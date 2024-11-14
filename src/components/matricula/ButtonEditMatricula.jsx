import * as Yup from "yup";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { Formik } from "formik";
import { MdEditDocument } from "react-icons/md";
import apiPut from "../../api/apiPut";
import Swal from "sweetalert2";
import useMatricula from "../../hooks/useMatricula";

const ButtonEditMatricula = ({row, authPeriodo, disable}) => { 

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const {matricula, updateDataMatricula} = useMatricula();

    const validationSchema = Yup.object().shape({
        description: Yup.string()
            .trim()
            .required("Ingresar descripcion válida! ")
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-_.,0-9]+$/, "No se permiten caracteres especiales !"),
    })

    const updateArray = ({dataArray}) => {
        const newArray = dataArray.map((item) => {
            if (item.id === row.id) {
                return {
                    ...item,
                    tiene_detalle: true
                };
            }
            return item;
        })

        return newArray;
    }

    const onSubmitAddDescription = (onClose) => ({description}, {setSubmitting}) => {
        // no es necesario validar campos vacios gracias a YUP
        setSubmitting(true);        

        try {
            apiPut({
                route: "matricula/putEditMatricula",
                object: {
                    editDetail: description,
                    idMatricula: row.id,
                    periodo: authPeriodo,
                    tiene_detalle: row.tiene_detalle
                },
            }).then((response) => {

                if (response?.data?.message === "success") {
                    // actualizar estado
                    updateDataMatricula({
                        matricula: updateArray({
                            dataArray: matricula,
                        })
                    })

                    // alerta toast al finalizar el ingrso de detalles
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
                        title: "Detalle almacenado con éxito",
                    });
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Acción denegada",
                        text: response?.data?.message,
                    })
                }

            }); 

        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
            onClose();
        }

    }

    return (
        <>
            <Button 
                isIconOnly 
                color="primary" 
                aria-label="agregar detalle modificación ficha" 
                radius="full"
                onPress={onOpen}
                isDisabled={disable}
            >
                <MdEditDocument size={20} />
            </Button>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                isDismissable={false}
                backdrop="blur"
                size="md"
            >
                <ModalContent className="relative p-2 bg-gray-100">
                    {(onClose) => (
                        <Formik
                            initialValues={{description: ""}}
                            validationSchema={validationSchema}
                            onSubmit={onSubmitAddDescription(onClose)}
                        >
                            {({values, handleSubmit, handleChange, setFieldValue, errors, touched, handleBlur, isSubmitting,}) => (
                                <>
                                    <ModalHeader className="text-2xl px-4 py-3">
                                        Detallar cambios
                                    </ModalHeader>

                                    <ModalBody className="relative w-full rounded-md px-2">
                                        <Textarea 
                                            color={
                                                touched.description && errors.description
                                                ? "danger"
                                                : "primary"
                                            }
                                            isRequired={true}
                                            name="description"
                                            value={values.description}
                                            onChange={(e) => setFieldValue("description", e.target.value.toUpperCase())}
                                            onBlur={handleBlur}
                                            label="Describa los cambios realizados en la ficha de matrícula"
                                            labelPlacement="outside"
                                            variant="bordered"
                                            placeholder="Ingresar detalle"
                                            className="w-full"
                                            isInvalid={touched.description && errors.description}
                                            errorMessage={
                                                touched.description &&
                                                errors.description
                                            }
                                        />
                                    </ModalBody>

                                    <ModalFooter>
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
                                                Registrar
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
    )
 }

 export default ButtonEditMatricula;