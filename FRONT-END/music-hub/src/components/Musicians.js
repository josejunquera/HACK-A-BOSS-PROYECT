import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function Musicians() {
  const [musician, setMusician] = useState([]);
  const [search, setSearch] = useState("");
  const [movility, setMovility] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [lookingForBand, setLookingForBand] = useState("");
  const [lookingForGig, setLookingForGig] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    const loadMusician = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/musicians/withgenres"
      );
      if (response.status === 200) {
        const body = await response.json();
        setMusician(body);
      }
    };
    loadMusician();
  }, []);

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
        <label>
          <p>Movilidad</p>
          <select
            id="movility"
            name="movility"
            onChange={(e) => setMovility(e.target.value)}
          >
            <option value="local">Local</option>
            <option value="provincial">Provincial</option>
            <option value="nacional">Nacional</option>
            <option value="internacional">Internacional</option>
          </select>
          <button
            onClick={(e) => {
              e.preventDefault();
              return setMovility("");
            }}
          >
            X
          </button>
        </label>

        <label>
          <p>Localizacion</p>
          <input
            type="text"
            name="location"
            value={localizacion}
            onChange={(e) => setLocalizacion(e.target.value)}
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              return setLocalizacion("");
            }}
          >
            X
          </button>
        </label>
        <label>
          <p>Busca Banda</p>
          <select
            id="busco-banda"
            name="busco-banda"
            onChange={(e) => setLookingForBand(e.target.value)}
          >
            <option value="si">Si</option>
            <option value="no">No</option>
          </select>
          <button
            onClick={(e) => {
              e.preventDefault();
              return setLookingForBand("");
            }}
          >
            X
          </button>
        </label>
        <label>
          <p>Busca Actuacion</p>
          <select
            id="busco-actuacion"
            name="busco-actuacion"
            onChange={(e) => setLookingForGig(e.target.value)}
          >
            <option value="si">Si</option>
            <option value="no">No</option>
          </select>
          <button
            onClick={(e) => {
              e.preventDefault();
              return setLookingForGig("");
            }}
          >
            X
          </button>
        </label>
        <label>
          <p>Genero</p>
          <select
            id="genero"
            name="genero"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="Rock">Rock</option>
            <option value="Pop">Pop</option>
            <option value="Jazz">Jazz</option>
            <option value="Trash">Trash</option>
            <option value="Metal">Metal</option>
          </select>
          <button
            onClick={(e) => {
              e.preventDefault();
              return setGenre("");
            }}
          >
            X
          </button>
        </label>
      </form>

      {musician
        .filter((val) => {
          if (search === "") {
            return true;
          } else if (
            val.nombre_solista.toLowerCase().includes(search.toLowerCase()) ||
            val.especialidad.toLowerCase().includes(search.toLowerCase()) ||
            val.movilidad.toLowerCase().includes(search.toLowerCase()) ||
            val.localizacion.toLowerCase().includes(search.toLowerCase()) ||
            val.generos.join().toLowerCase().includes(search.toLowerCase())
          ) {
            return true;
          }
          return false;
        })
        .filter((val) => {
          if (genre === "") {
            return true;
          } else if (
            val.generos.join().toLowerCase().includes(genre.toLowerCase())
          ) {
            return true;
          }
          return false;
        })
        .filter((val) => {
          if (movility === "") {
            return true;
          } else if (val.movilidad.toLowerCase() == movility.toLowerCase()) {
            return true;
          }
          return false;
        })
        .filter((val) => {
          if (localizacion === "") {
            return true;
          } else if (
            val.localizacion.toLowerCase().includes(localizacion.toLowerCase())
          ) {
            return true;
          }
          return false;
        })
        .filter((val) => {
          if (lookingForBand === "") {
            return true;
          } else if (
            val.busco_banda.toLowerCase() == lookingForBand.toLowerCase()
          ) {
            return true;
          }
          return false;
        })
        .filter((val) => {
          if (lookingForGig === "") {
            return true;
          } else if (
            val.busco_actuacion.toLowerCase() == lookingForGig.toLowerCase()
          ) {
            return true;
          }
          return false;
        })
        .map((musiciann) => (
          <MusicoIndividual key={musiciann.id_usuario} musiciann={musiciann} />
        ))}
    </>
  );
}

export default Musicians;

const MusicoIndividual = (props) => {
  const [urlCoverImage, setUrlCoverImage] = useState("");
  const { musiciann } = props;
  const url = `http://localhost:3006/musicians-media/user${musiciann.id_usuario}/CoverImage.`;

  useEffect(() => {
    const loadCoverImage = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/musicians/get-cover-image/${musiciann.id_solista}`
      );
      if (response.status === 200) {
        const body = await response.json();
        setUrlCoverImage(body.url);
      }
    };
    loadCoverImage();
  }, [musiciann]);

  const urlToShow = urlCoverImage
    ? `url(${url}${urlCoverImage.split(".").pop()})`
    : `url(http://localhost:3006/users-media/CoverImage.jpg)`;
  return (
    <Link to={`/musicians/${musiciann.id_usuario}`}>
      <div
        style={{
          backgroundImage: urlToShow,
          backgroundRepeat: "no-repeat",
          width: "250px",
        }}
      >
        <ul className="musicians-list">
          <li className="list">
            <span className="repo-text">{musiciann.nombre_solista} </span>
          </li>
          <li className="list">
            <span className="repo-text">{musiciann.localizacion} </span>
          </li>
          <li className="list">
            <span className="repo-text">{musiciann.especialidad} </span>
          </li>
          <li className="list">
            <span className="repo-text">{musiciann.movilidad} </span>
          </li>
          <li className="list">
            <span className="repo-text">
              Busco banda: {musiciann.busco_banda}
            </span>
          </li>
          <li className="list">
            <span className="repo-text">
              Busco actuación: {musiciann.busco_actuacion}{" "}
            </span>
          </li>
          <li className="list">
            {" "}
            <span className="repo-text">
              {musiciann.generos.map((genero) => {
                return genero + " ";
              })}
            </span>
          </li>
        </ul>
      </div>
    </Link>
  );
};
