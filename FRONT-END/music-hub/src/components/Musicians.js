import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

function Musicians() {
  const [musician, setMusician] = useState([]);

  useEffect(() => {
    const loadMusician = async () => {
      const response = await fetch("http://localhost:3000/api/v1/musicians");
      if (response.status === 200) {
        const body = await response.json();
        setMusician(body);
      }
    };
    loadMusician();
    console.log(musician);
  }, []);

  return (
    <>
      <NavBar />
      <ul>
        {musician.map((musiciann) => {
          return (
            <li key={musiciann.id_solista} className="list">
              <span className="repo-text">{musiciann.nombre_solista} </span>
              <span className="repo-text">{musiciann.localizacion} </span>
              <span className="repo-text">{musiciann.movilidad} </span>
              <span className="repo-text">{musiciann.descripcion} </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Musicians;
