const InformativeToolpin = ({
  text,
  visible,
  colorText,
  background,
  ejex,
  ejey,
  sizeText,
}) => {
  // respaldo (right-[4.5rem] top-[.2rem])
  return (
    <div
      className={`absolute p-2 rounded-md z-10 font-semibold
          transition-all duration-300 whitespace-nowrap text-[.9rem]
          ${visible ? "visible opacity-100" : "invisible opacity-0"}
          ${ejex} ${ejey} ${colorText} ${background}`}
    >
      {/* texto del toolpin */}
      {text}
    </div>
  );
};

export default InformativeToolpin;
