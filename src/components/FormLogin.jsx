import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Formik } from "formik";
import * as Yup from "yup";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const FormLogin = () => {
  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      console.log({ email, password });
    } catch (error) {
      if (error.code === "error de email")
        return setErrors({ email: "Usuario no registrado !!" });

      if (error.code === "error de password")
        return setErrors({ password: "Contraseña incorrecta !!" });
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("E-mail no válido !")
      .required("E-mail requerido !"),
    password: Yup.string()
      .min(6, "La contraseña debe contener al menos 6 caracteres")
      .max(12, "La contraseña no puede tener mas de 12 caracteres")
      .required("Password requerida !")
      .matches(
        PASSWORD_REGEX,
        "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y alguno de estos caracteres especiales '! @ # $ %' !"
      ),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <input
              className={`peer mt-6 w-full p-3 rounded-xl outline-none border focus:ring-1 focus:border-sky-300 transition-colors duration-300 
              ${
                values.email !== "" &&
                touched.email &&
                errors.email &&
                "border-red-400"
              }`}
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label
              htmlFor="email"
              className={`absolute px-1 flex gap-1 transition-all duration-300 ease-in-out text-gray-400 bg-white peer-focus:left-5 peer-focus:top-3 peer-focus:text-sm 
              ${
                values.email === ""
                  ? "left-4 top-[2.3rem]"
                  : "left-5 top-3 text-sm"
              }`}
            >
              E-mail
            </label>
            <span
              className={`
              absolute -right-2 top-[.7rem]  px-1 bg-white 
              ${errors.email ? "text-red-400" : "text-green-500"}
              ${values.email !== "" ? "block" : "hidden"} 
              `}
            >
              {touched && errors.email ? (
                <ErrorOutlineIcon sx={{ fontSize: 22 }} />
              ) : (
                <CheckCircleOutlineIcon sx={{ fontSize: 22 }} />
              )}
            </span>
            <span>
              {errors.email && touched.email && values.email !== "" && (
                <div className="text-sm p-1 text-red-400">{errors.email}</div>
              )}
            </span>
          </div>
          <div className="relative">
            <input
              className="peer w-full p-3 rounded-xl outline-none border focus:ring-1 focus:border-sky-300 transition-colors duration-300 invalid:border-red-400"
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-[.8rem] transition-all duration-300 ease-in-out text-gray-400 bg-white peer-focus:left-5 peer-focus:-top-3 peer-focus:text-sm peer-invalid:-top-3 peer-invalid:text-sm"
            >
              Password
            </label>

            <span className="text-gray-400 absolute right-5 top-[.8rem] hover:text-gray-500 hover:scale-105 transition-all duration-300 ease-in-out">
              <RemoveRedEyeIcon />
              {/* <VisibilityOffIcon /> */}
            </span>
            <span>
              {errors.password &&
                touched.password &&
                values.password !== "" && <div>{errors.password}</div>}
            </span>
          </div>

          <button
            className="bg-blue-700 rounded-xl text-white font-bold p-3 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:shadow-xl"
            type="submit"
            disabled={isSubmitting}
          >
            Sing in
          </button>
        </form>
      )}
    </Formik>
  );
};

export default FormLogin;
