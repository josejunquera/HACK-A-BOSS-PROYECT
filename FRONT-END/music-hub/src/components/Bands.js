import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

function Bands() {
  const [band, setBand] = useState([]);

  useEffect(() => {
    const loadBand = async () => {
      const response = await fetch("http://localhost:3000/api/v1/bands");
      if (response.status === 200) {
        const body = await response.json();
        setBand(body);
      }
    };
    loadBand();
    console.log(band);
  }, [band, setBand]);

  return (
    <>
      <NavBar />
      {band.map((bandn) => {
        return (
          <>
            <ul key={bandn.id_solista} className="bands-list">
              <li className="list">
                <span className="repo-text">
                  Nombre banda: {bandn.nombre_banda}
                </span>
              </li>
              <li className="list">
                <span className="repo-text">
                  Descripción: {bandn.descripcion}
                </span>
              </li>
              <li className="list">
                <span className="repo-text">
                  Localización:{bandn.localizacion}
                </span>
              </li>
              <li className="list">
                <span className="repo-text">Movilidad: {bandn.movilidad} </span>
              </li>
            </ul>
          </>
        );
      })}
    </>
  );
}

export default Bands;
