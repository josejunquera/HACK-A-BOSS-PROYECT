import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

function Bands() {
  const [band, setBand] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const loadBand = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/bands/withgenres"
      );
      if (response.status === 200) {
        const body = await response.json();
        setBand(body);
      }
    };
    loadBand();
  }, [band]);

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <NavBar />

      <form>
        <div>
          <label>Busqueda</label>
          <input
            type="text"
            name="location"
            value={search}
            onChange={onChange}
          />
        </div>
      </form>

      {band
        .filter((val) => {
          if (search == "") {
            return val;
          } else if (
            val.nombre_banda.toLowerCase().includes(search.toLowerCase()) ||
            val.localizacion.toLowerCase().includes(search.toLowerCase()) ||
            val.movilidad.toLowerCase().includes(search.toLowerCase())
          ) {
            return val;
          }
        })

        .map((bandn) => {
          return (
            <div
              style={{
                backgroundImage: `url(http://localhost:3006/users-media/avatarDefault.png)`,
                backgroundRepeat: "no-repeat",
                width: "250px",
              }}
            >
              <ul key={bandn.id_solista} className="bands-list">
                <li className="list">
                  <span className="repo-text">{bandn.nombre_banda}</span>
                </li>
                <li className="list">
                  <span className="repo-text">{bandn.localizacion}</span>
                </li>
                <li className="list">
                  <span className="repo-text">{bandn.movilidad} </span>
                </li>
                <li className="list">
                  {" "}
                  <span className="repo-text">
                    {bandn.generos.map((genero) => {
                      return genero + " ";
                    })}
                  </span>
                </li>
              </ul>
            </div>
          );
        })}
    </>
  );
}

export default Bands;
