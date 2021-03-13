import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import Avatar from "./Avatar";
import "./NavBar.css";
import logOut from "./logOut";

function NavBar() {
  const [token, setToken] = useContext(AuthContext);

  function myFunction() {
    const x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  const jsxToReturn = token ? (
    <nav className="topnav">
      <div className="active">
        <Link to="/">
          <img src="/assets/logo.png" alt="logo"></img>
        </Link>
      </div>

      <div id="myLinks">
        <Link to="/musicians">Músicos</Link>
        <Link to="/bands">Bandas</Link>
        <Avatar id="avatar-nav" />
        <button className="btn logout" onClick={logOut}>
          LOGOUT
        </button>
      </div>
      <a className="icon" onClick={myFunction}>
        <i className="fa fa-bars"></i>
      </a>
    </nav>
  ) : (
    <nav className="topnav">
      <div className="active">
        <Link to="/">
          <img src="/assets/logo.png" alt="logo"></img>
        </Link>
      </div>

      <div id="myLinks">
        <Link to="/musicians">Músicos</Link>
        <Link to="/bands">Bandas</Link>
        <Link to="/login">LOGIN</Link>
        <Link to="/register">REGISTRO</Link>
      </div>
      <a className="icon" onClick={myFunction}>
        <i className="fa fa-bars"></i>
      </a>
    </nav>
  );

  return jsxToReturn;
}

export default NavBar;
