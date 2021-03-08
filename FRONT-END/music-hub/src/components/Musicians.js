import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

function Musicians() {
  const [musician, setMusician] = useState([]);

  useEffect(() => {
    const loadMusician = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/musicians/withgenres"
      );
      if (response.status === 200) {
        const body = await response.json();
        setMusician(body);
        console.log(musician);
      }
    };
    loadMusician();
    console.log(musician);
  }, [musician, setMusician]);

  return (
    <>
      <NavBar />
      {musician.map((musiciann) => {
        return (
          <>
            <ul key={musiciann.id_solista} className="musicians-list">
              <li className="list">
                <span className="repo-text">
                  Nombre solista: {musiciann.nombre_solista}{" "}
                </span>
              </li>
              <li className="list">
                <span className="repo-text">
                  Descripción: {musiciann.descripcion}{" "}
                </span>
              </li>
              <li className="list">
                <span className="repo-text">
                  Especialidad:{musiciann.especialidad}{" "}
                </span>
              </li>
              <li className="list">
                <span className="repo-text">
                  Movilidad: {musiciann.movilidad}{" "}
                </span>
              </li>
              <li className="list">
                {" "}
                Géneros:
                <span className="repo-text">
                  {musiciann.generos.map((genero) => {
                    return genero + " ";
                  })}
                </span>
              </li>
            </ul>
          </>
        );
      })}
    </>
  );
}

export default Musicians;
