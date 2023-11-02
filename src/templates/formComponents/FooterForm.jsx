const FooterForm = ({ onCloseModal, isSubmitting }) => {
  return (
    <footer className="relative flex justify-between items-center xs:justify-end gap-4 p-2">
      <button
        className="bg-red-500 text-white text-lg font-bold p-3 rounded-md outline-none w-full xs:w-36
              hover:opacity-90 hover:shadow-sm hover:shadow-gray-600 active:scale-105 transition-all duration-300"
        type="button"
        onClick={onCloseModal}
      >
        Cancelar
      </button>

      <button
        className="bg-green-500 text-white text-lg font-bold p-3 rounded-md outline-none w-full xs:w-36
              hover:opacity-90 hover:shadow-sm hover:shadow-gray-600 active:scale-105 transition-all duration-300"
        type="submit"
        disabled={isSubmitting}
      >
        Registrar
      </button>
    </footer>
  );
};

export default FooterForm;
