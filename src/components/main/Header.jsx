// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Header = () => {
  return (
    <header className="py-6 bg-white my-1 mx-2 rounded-md h-20">
      <nav className="relative flex gap-4 items-center transition-all duration-300">
        {/* <span
          className="bg-gradient-to-bl from-blue-400 to-cyan-400 text-white border-2 border-gray-300 
                w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center absolute left-2 md:-left-6 
                transition-all duration-300 rotate-180 lg:rotate-0 cursor-pointer"
          onClick={() => {
            console.log("presion");
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 30 }} />
        </span> */}
        {/* <h1>Mi navbar</h1> */}
      </nav>
    </header>
  );
};

export default Header;
