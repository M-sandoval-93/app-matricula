const Section = ({ children }) => {
  return (
    <section
      id="section_main"
      className="flex flex-1 bg-white dark:bg-gray-800 my-1 mx-2 rounded-md overflow-hidden overflow-y-auto transition-all duration-300"
    >
      <div className="w-full p-5">{children}</div>
    </section>
  );
};

export default Section;
