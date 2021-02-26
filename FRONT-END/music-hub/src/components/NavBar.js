import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/">musicHub</Link>
      </div>

      <div className="links"></div>

      <div className="sign">
        <Link to="/musicians">Músicos</Link>
        <Link to="/login">LOGIN</Link>
        <Link to="/register">REGISTRO</Link>
      </div>
    </nav>
  );
}

export default NavBar;
