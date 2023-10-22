import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const DesigneContext = createContext({});

export const DesigneProvider = ({ children }) => {
  const [designe, setDesigne] = useState(() => ({
    responsive: sessionStorage.getItem("responsive") === "true",
    theme: sessionStorage.getItem("theme") === "dark",
  }));

  const handlerResponsive = useCallback(() => {
    setDesigne((prevDesigne) => ({
      ...prevDesigne,
      responsive: !prevDesigne.responsive,
    }));
  }, []);

  const handlerTheme = useCallback(() => {
    setDesigne((prevDesigne) => ({
      ...prevDesigne,
      theme: !prevDesigne.theme,
    }));
  }, []);

  useEffect(() => {
    const themeClass = designe.theme ? "dark" : "light";
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(themeClass);
    sessionStorage.setItem("theme", themeClass);
  }, [designe.theme]);

  useEffect(() => {
    sessionStorage.setItem("responsive", designe.responsive);
  }, [designe.responsive]);

  const value = useMemo(
    () => ({
      handlerResponsive,
      handlerTheme,
      ...designe,
    }),
    [handlerResponsive, handlerTheme, designe]
  );

  return (
    <DesigneContext.Provider value={value}>{children}</DesigneContext.Provider>
  );
};

export default DesigneContext;
