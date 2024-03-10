import { createContext, useCallback, useMemo, useState } from "react";
import { getCurrentYear } from "../utils/funciones";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const year = getCurrentYear(); // obtención del año actual

  const [auth, setAuth] = useState(() => ({
    auth: sessionStorage.getItem("auth") ?? false,
    authPrivilege: sessionStorage.getItem("authPrivilege") ?? null,
    authToken: sessionStorage.getItem("authToken") ?? null,
    authEmail: sessionStorage.getItem("authEmail") ?? null,
    authUserName: sessionStorage.getItem("authUserName") ?? null,
    authPeriodo: localStorage.getItem("authPeriodo") ?? year,
    authProcesoMatricula: localStorage.getItem("authProcesoMatricula") ?? false,
    authClassStartDate: localStorage.getItem("authClassStartDate") ?? null,
    error: null, // probar funcionalidad y eficiencia
  }));

  // función para actualizar estados del provider auth
  const updateAuthProvider = useCallback((newData) => {
    setAuth((prevData) => ({ ...prevData, ...newData }));
  }, []);

  // asigna el nuevo periodo escolar
  const setPeriodo = useCallback((periodo) => {
    updateAuthProvider({ authPeriodo: periodo });
    localStorage.setItem("authPeriodo", periodo);
  }, []);

  // asignar el nuevo estado del proceso de matricula
  const setProcesoMatricula = useCallback((procesoMatricula) => {
    updateAuthProvider({ authProcesoMatricula: procesoMatricula });
    localStorage.setItem("authProcesoMatricula", procesoMatricula);

    if (procesoMatricula === false) setPeriodo(year);
  }, []);

  const setClassStartDate = useCallback((classStartDate) => {
    updateAuthProvider({ authClassStartDate: classStartDate });
    localStorage.setItem("authClassStartDate", classStartDate);
  }, []);

  const bloqueoPeriodoActual =
    parseInt(auth.authPeriodo) === parseInt(year) && auth.authProcesoMatricula;

  // función para iniciar sesión
  const login = useCallback((privilege, token, email, userName) => {
    updateAuthProvider({
      auth: true,
      authPrivilege: privilege,
      authToken: token,
      authEmail: email,
      authUserName: userName,
    });

    sessionStorage.setItem("auth", true);
    sessionStorage.setItem("authPrivilege", privilege.toString());
    sessionStorage.setItem("authToken", token.toString());
    sessionStorage.setItem("authEmail", email.toString());
    sessionStorage.setItem("authUserName", userName.toString());
  }, []);

  // función para cerrar sesión
  const logout = useCallback(() => {
    updateAuthProvider({
      auth: false,
      authPrivilege: null,
      authToken: null,
      authEmail: null,
      authUserName: null,
    });

    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("authPrivilege");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authEmail");
    sessionStorage.removeItem("authUserName");
  }, []);

  // valores del provider
  const value = useMemo(
    () => ({
      updateAuthProvider,
      setPeriodo,
      setProcesoMatricula,
      setClassStartDate,
      bloqueoPeriodoActual,
      login,
      logout,
      ...auth,
    }),
    [
      updateAuthProvider,
      setPeriodo,
      setProcesoMatricula,
      setClassStartDate,
      bloqueoPeriodoActual,
      login,
      logout,
      auth,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
