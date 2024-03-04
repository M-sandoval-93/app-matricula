const InformativeToolpin = ({ text, visible, colorText, background }) => {
  return (
    <div
      className={`absolute p-2 right-[4.5rem] top-[.2rem] text-xs rounded-md
          transition-all duration-300 whitespace-nowrap z-10
          ${visible ? "visible opacity-100" : "invisible opacity-0"}
          ${colorText} ${background}`}
    >
      {/* texto del toolpin */}
      {text}
    </div>
  );
};

export default InformativeToolpin;
