import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const HeaderTableMatricula = ({ filter, setFilter, setOpen }) => {
  return (
    <div className="relative w-full flex flex-wrap gap-3 items-center justify-center sm:justify-between my-2">
      <button
        className="px-2 py-1 border rounded-md hover:shadow-md hover:scale-105
        text-blue-500 border-blue-500 hover:shadow-blue-600 transition-all duration-200"
        onClick={setOpen}
      >
        <OpenInNewIcon sx={{ fontSize: 30 }} />
      </button>

      <div className="relative flex items-center justify-end gap-2">
        <span className="absolute left-2 text-gray-400">
          <SearchIcon sx={{ fontSize: 30 }} />
        </span>
        <input
          type="search"
          placeholder="Search ..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="border outline-none border-gray-300 focus:shadow focus:shadow-gray-400 rounded-md py-2 pl-10"
        />
        <span
          className="absolute right-2 text-gray-400 cursor-pointer"
          onClick={() => setFilter("")}
        >
          <ClearIcon sx={{ fontSize: 30 }} />
        </span>
      </div>
    </div>
  );
};

export default HeaderTableMatricula;
