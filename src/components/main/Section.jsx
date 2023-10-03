const Section = ({ children }) => {
  return (
    <section
      id="section_main"
      className="flex flex-1 bg-white my-1 mx-2 rounded-md overflow-hidden overflow-y-auto"
    >
      <div className="w-full p-5">{children}</div>
    </section>
  );
};

export default Section;
