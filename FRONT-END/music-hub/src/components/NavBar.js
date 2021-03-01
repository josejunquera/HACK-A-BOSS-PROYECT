import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import Avatar from "./Avatar";

function NavBar() {
  const [token, setToken] = useContext(AuthContext);

  const jsxToReturn = token ? (
    <nav className="nav">
      <div className="logo">
        <Link to="/">musicHub</Link>
      </div>

      <div className="links"></div>

      <div className="sign">
        <Link to="/musicians">Músicos</Link>
        <Link to="/bands">Bandas</Link>
        <Avatar />
      </div>
    </nav>
  ) : (
    <nav className="nav">
      <div className="logo">
        <Link to="/">musicHub</Link>
      </div>

      <div className="links"></div>

      <div className="sign">
        <Link to="/musicians">Músicos</Link>
        <Link to="/bands">Bandas</Link>
        <Link to="/login">LOGIN</Link>
        <Link to="/register">REGISTRO</Link>
      </div>
    </nav>
  );

  return jsxToReturn;
}

export default NavBar;
