import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  //   console.log(props);
  //   const { Link } = props;
  //   console.log({ link });

  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/">musicHub</Link>
      </div>

      <div className="links"></div>

      <div className="sign">
        <a href="">Músicos</a>
        <a href="">Bandas</a>
        <Link to="/login">SIGN IN</Link>
        <Link to="/register">SIGN UP</Link>
      </div>
    </nav>
  );
}

export default NavBar;
