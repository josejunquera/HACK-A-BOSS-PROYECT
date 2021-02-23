import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  //   console.log(props);
  //   const { Link } = props;
  //   console.log({ link });

  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/">
          <img src="" alt="logo" />
        </Link>
      </div>

      <div className="links">
        <a href="">Músicos</a>
        <a href="">Bandas</a>
        <a href="">Sobre Nosotros</a>
      </div>

      <div className="sign">
        <Link to="/login">Sign In</Link>
        <Link to="/register">Sign Up</Link>
      </div>
    </nav>
  );
}

export default NavBar;
