import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function Bands() {
  const [band, setBand] = useState([]);
  const [search, setSearch] = useState("");
  const [movility, setMovility] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [lookingForMusician, setLookingForMusician] = useState("");
  const [lookingForGig, setLookingForGig] = useState("");
  const [genre, setGenre] = useState("");

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
          <p>Busca Músico</p>
          <select
            id="busco-musico"
            name="busco-musico"
            onChange={(e) => setLookingForMusician(e.target.value)}
          >
            <option value="si">Si</option>
            <option value="no">No</option>
          </select>
          <button
            onClick={(e) => {
              e.preventDefault();
              return setLookingForMusician("");
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

      {band
        .filter((val) => {
          if (search === "") {
            return true;
          } else if (
            val.nombre_banda.toLowerCase().includes(search.toLowerCase()) ||
            val.localizacion.toLowerCase().includes(search.toLowerCase()) ||
            val.movilidad.toLowerCase().includes(search.toLowerCase()) ||
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
          if (lookingForMusician === "") {
            return true;
          } else if (
            val.busco_solista.toLowerCase() == lookingForMusician.toLowerCase()
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
        .map((bandn) => (
          <BandaIndividual key={bandn.id_usuario} bandn={bandn} />
        ))}
    </>
  );
}

export default Bands;

const BandaIndividual = (props) => {
  const [urlCoverImage, setUrlCoverImage] = useState("");
  const { bandn } = props;
  const url = `http://localhost:3006/band-media/user${bandn.id_usuario}/CoverImage.`;

  useEffect(() => {
    const loadCoverImage = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/bands/get-cover-image/${bandn.id_banda}`
      );
      if (response.status === 200) {
        const body = await response.json();
        setUrlCoverImage(body.url);
      }
    };
    loadCoverImage();
  }, [bandn]);

  const urlToShow = urlCoverImage
    ? `url(${url}${urlCoverImage.split(".").pop()})`
    : `url(http://localhost:3006/users-media/CoverImage.jpg)`;

  return (
    <Link to={`/bands/${bandn.id_usuario}`}>
      <div
        style={{
          backgroundImage: urlToShow,
          backgroundRepeat: "no-repeat",
          width: "250px",
        }}
      >
        <ul className="bands-list">
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
            <span className="repo-text">
              Busco solista: {bandn.busco_solista}
            </span>
          </li>
          <li className="list">
            <span className="repo-text">
              Busco actuación: {bandn.busco_actuacion}{" "}
            </span>
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
    </Link>
  );
};
