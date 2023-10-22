import CloseIcon from "@mui/icons-material/Close";

const ModalStudent = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 duration-300
    ${open ? "visible bg-black/50" : "invisible"}
    `}
    >
      <div
        className={`bg-white rounded-xl shadow p-6 transition-all duration-300 ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          className={`absolute top-2 right-2 p-2 rounded-full text-dark bg-white hover:bg-gray-100`}
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalStudent;
