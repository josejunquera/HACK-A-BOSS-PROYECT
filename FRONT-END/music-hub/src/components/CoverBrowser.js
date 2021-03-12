import React from "react";
import { Link } from "react-router-dom";
import "./CoverBrowser.css";

function CoverBrowser() {
  return (
    <div className="coverButtons">
      <div>
        <Link to="/musicians">
          <button className="button">SOLISTAS</button>
        </Link>
      </div>
      <div>
        <Link to="/bands">
          <button className="button">BANDAS</button>
        </Link>
      </div>
    </div>
  );
}

export default CoverBrowser;
