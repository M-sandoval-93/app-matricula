import { useLoaderData } from "react-router-dom";
import axios from "../api/axios";
import DataTable from "react-data-table-component";
import handlerError from "../utils/handlerError";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import ModalStudent from "../templates/ModalStudent";

const Student = () => {
  const { response, error } = useLoaderData();
  handlerError(error);

  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setData(response?.data ?? []);
  }, [setData]);

  const customStyle = {
    subHeader: {
      style: {
        "border-top-right-radius": "0.375rem",
        "border-top-left-radius": "0.375rem",
      },
    },
    headRow: {
      style: {
        fontSize: "1rem",
        color: "rgb(37 99 235)",
      },
    },
    rows: {
      style: {
        fontSize: ".8rem",
        "font-weight": "500",
      },
    },
    pagination: {
      style: {
        "border-bottom-right-radius": "0.375rem",
        "border-bottom-left-radius": "0.375rem",
      },
    },
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const columns = [
    {
      name: "Rut",
      width: "130px",
      selector: (row) => row.rut_estudiante,
      sortable: true,
    },
    {
      name: "Nombres",
      selector: (row) => row.nombres_estudiante,
      sortable: true,
      wrap: true,
      reorder: true,
    },
    {
      name: "Apellido paterno",
      selector: (row) => row.ap_estudiante,
    },
    {
      name: "Apellido materno",
      selector: (row) => row.am_estudiante,
    },
    {
      name: "Acciones",
      width: "150px",
      cell: (row) => (
        <div className="flex gap-4">
          <button
            className="px-2 py-1 border rounded-md text-orange-400 border-orange-500 hover:shadow-sm hover:shadow-orange-600"
            onClick={() =>
              console.log("editar estudiante id: " + row.id_estudiante)
            }
          >
            <EditIcon sx={{ fontSize: 25 }} />
          </button>
          <button
            className="px-2 py-1 border rounded-md text-red-400 border-red-500 hover:shadow-sm hover:shadow-red-600"
            onClick={() =>
              console.log("eliminar estudiante id: " + row.id_estudiante)
            }
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const expandComponent = ({ data }) => (
    <div className="px-16 text-sm">
      <p>Componente personalizado</p>
      <span>{data.id_estudiante}</span>
    </div>
  );

  const handlerFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredData = data.filter((row) => {
    const values = Object.values(row).join(" ").toLowerCase();
    return values.includes(filterText.toLowerCase());
  });

  const noDataComponent = () => (
    <div className="p-10 rounded-md bg-blue-200 text-3xl w-full text-center mt-4 opacity-80">
      Sin datos para mostrar
    </div>
  );

  const subHeaderComponent = () => {
    return (
      <div className="relative w-full flex items-center justify-between my-2">
        <button
          className="text-blue-600 hover:cursor-pointer w-16 rounded-md border
        border-blue-400 hover:shadow-sm hover:shadow-blue-400"
          onClick={() => setOpen(true)}
        >
          <AddBoxIcon sx={{ fontSize: 35 }} />
        </button>
        <div className="relative flex items-center justify-end gap-2">
          <span className="absolute left-2 text-gray-400">
            <SearchIcon sx={{ fontSize: 30 }} />
          </span>
          <input
            type="search"
            placeholder="Search..."
            value={filterText}
            onChange={handlerFilterChange}
            className="border rounded-md py-2 pl-10"
          />
          <span
            className="absolute right-2 text-gray-400 cursor-pointer"
            onClick={() => setFilterText("")}
          >
            <ClearIcon sx={{ fontSize: 30 }} />
          </span>
        </div>
      </div>
    );
  };

  return (
    <section className="relative flex flex-col gap-2 mb-3">
      <header className="relative bg-white rounded-md">
        <h2 className="text-xl text-blue-600">Nómina de estudiantes</h2>
      </header>

      <div className="rounded-md border border-gray-200 overflow-hidden">
        <div className="pt-2">
          <DataTable
            fixedHeader
            fixedHeaderScrollHeight="540px"
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            responsive
            expandableRows
            expandOnRowDoubleClicked
            persistTableHead
            expandableRowsComponent={expandComponent}
            noDataComponent={noDataComponent()}
            customStyles={customStyle}
            paginationComponentOptions={paginationComponentOptions}
            subHeader
            subHeaderComponent={subHeaderComponent()}
          />
        </div>
      </div>

      <ModalStudent open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-80">
          <DeleteIcon sx={{ fontSize: 40 }} />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-500">
              Are youre sure you want to delete this item?
            </p>
          </div>

          <div className="flex gap-4">
            <button className="bg-red-600 rounded-md w-full p-3 text-white">
              Delete
            </button>
            <button
              className="bg-gray-600 rounded-md w-full p-3 text-white"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </ModalStudent>
    </section>
  );
};

export default Student;

export const loaderStudent = async () => {
  const STUDENT_URL = "/student";
  const token = sessionStorage.getItem("authToken") ?? null;
  try {
    const response = await axios.get(STUDENT_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return { response };
  } catch (error) {
    if (error.response) return { error: error.response.data.message };
    return { error: error.message };
  }
};
