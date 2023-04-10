import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { routes } from "../../routes";
import "./sidebar.scss";
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const path = window.location.pathname

  const navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('accessToken');
    navigate("/login");
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">HealthSalon</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {routes.map((route) => (
            <Fragment key={route.title}>
              <li>{route.title}</li>
              {route.items.map((item) => {
                return (
                  <Link to={item.to} style={{ textDecoration: "none" }} key={item.label}>
                    <li className={path === item.to ?'active':''}>
                      {item.icon}
                      <span>{item.label}</span>
                    </li>
                  </Link>
                )
              })}
            </Fragment>
          ))}

            <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
