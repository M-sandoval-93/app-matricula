import { createContext, useCallback, useMemo, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({
    auth: sessionStorage.getItem("auth") ?? false,
    authPrivilege: sessionStorage.getItem("authPrivilege") ?? null,
    authToken: sessionStorage.getItem("authToken" ?? null),
    authEmail: sessionStorage.getItem("authEmail" ?? null),
    authUserName: sessionStorage.getItem("authUserName" ?? null),
  }));

  const login = useCallback((privilege, token, email, userName) => {
    setAuth({
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

  const logout = useCallback(() => {
    setAuth({
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

  const value = useMemo(
    () => ({
      login,
      logout,
      ...auth,
    }),
    [login, logout, auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
