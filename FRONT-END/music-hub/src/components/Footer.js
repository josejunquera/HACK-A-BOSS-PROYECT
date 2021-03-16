import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <img src="/assets/logo_pequeño.png" alt="logo" />

      <div className="linkedin">
        <a href="https://www.linkedin.com/in/alberto-bujan-bb1bb0146/">
          Alberto Buján<img src="/assets/linkedin.png" alt="linkedin"></img>
        </a>
        <a href="https://www.linkedin.com/in/pablo-diaz-garcia-a25166200/">
          Pablo Díaz<img src="/assets/linkedin.png" alt="linkedin"></img>
        </a>
        <a href="https://www.linkedin.com/in/jos%C3%A9-junquera-fdez-arg%C3%BCelles-b96280ba/">
          José Junquera<img src="/assets/linkedin.png" alt="linkedin"></img>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
