import { NavLink } from "react-router-dom";
import useDesigne from "../../hooks/useDesigne";
// import useResponsive from "../../hooks/useResponsive";

const SidebarItem = ({ to, icon, text, active, alert, onClick, isLast }) => {
  const { responsive } = useDesigne();

  return (
    <NavLink
      to={to}
      className={`
      ${isLast && responsive && "absolute bottom-10"}
      ${isLast && !responsive && "absolute bottom-10"}


      ${!isLast && "relative"}
      custom-hover group
      ${responsive ? "custom-hover-expand" : "custom-hover-contract"}`}
      onClick={onClick}
    >
      <span className={`relative overflow-hidden flex items-center gap-4 h-14`}>
        {icon}
        <h3
          className={`text-lg font-semibold transition-all duration-300 
            ${isLast && !responsive && "opacity-100 md:opacity-0"}
            ${isLast && responsive && "opacity-0 lg:opacity-100"}
            ${responsive ? "ml-8 lg:ml-0" : "lg:ml-8"}
          `}
        >
          {text}
        </h3>
      </span>

      <div
        className={`absolute rounded-md px-2 py-2 ml-12
         bg-cyan-100 text-blue-500 text-sm md:group-hover:visible
          transition-all duration-300 opacity-20 invisible group-hover:opacity-100
          ${isLast ? "top-3" : "top-6"}
          ${responsive ? "lg:group-hover:invisible" : "invisible"}
      `}
      >
        {text}
      </div>
    </NavLink>
  );
};

export default SidebarItem;
