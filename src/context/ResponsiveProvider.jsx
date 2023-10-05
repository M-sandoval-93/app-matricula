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
    theme: sessionStorage.getItem("theme") === "false",
  }));

  const handlerResponsive = useCallback(() => {
    setDesigne({ responsive: !designe.responsive });
    sessionStorage.setItem("responsive", !designe.responsive);
  }, [designe.responsive]);

  const handlerTheme = useCallback(() => {
    setDesigne({ theme: !designe.theme });
    sessionStorage.setItem("theme", !designe.theme);
  }, [designe.theme]);


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
