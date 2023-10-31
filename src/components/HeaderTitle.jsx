import redirectHome from "../utils/redirectHome";

const HeaderTitle = ({ children, title }) => {
  const redirect = redirectHome();
  return (
    <header className="relative bg-transparent flex flex-wrap items-center justify-between w-full gap-y-4 xs:py-2">
      <section className="w-full sm:w-1/2 xs:px-2">
        <h2 className="text-3xl text-blue-600 dark:text-blue-300"> {title} </h2>
        <div className="relative flex gap-2">
          <p
            className="text-blue-600 dark:text-blue-300 text-base hover:cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={redirect}
          >
            Home
          </p>
          <span className="text-gray-500 dark:text-gray-300 text-base">/</span>
          <p className="text-gray-500 dark:text-gray-300 text-base">{title}</p>
        </div>
      </section>

      {/* Seccion derecha del header del componente title, personalizar */}
      {children}
    </header>
  );
};

export default HeaderTitle;
