import { NavLink } from "react-router-dom";

const SidebarItem = ({ to, icon, text, active, alert, onClick, isLast }) => {
  return (
    <NavLink
      to={to}
      className={`
      ${
        isLast ? "" : ""
      } `}
      onClick={onClick}
    >
      {icon}

      <h3 className="">
        {text}
      </h3>
    </NavLink>
  );
};

export default SidebarItem;
