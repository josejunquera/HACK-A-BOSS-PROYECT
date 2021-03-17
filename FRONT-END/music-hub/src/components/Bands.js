import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./Musicians.css";
import Footer from "./Footer";

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
      <div className="buscador-wrapper">
        <form className="buscador-form">
          <div>
            <img
              className="search-input-icon"
              src="/assets/search.png"
              style={{
                position: "absolute",
                right: 20,
                top: 107,
                width: 18,
                height: 18,
              }}
              alt="search-icon"
            />
            <input
              type="text"
              name="location"
              value={search}
              onChange={onChange}
              placeholder="Término de búsqueda..."
              className="search-input-browser"
            />
          </div>

          <div className="secondary-browser-container">
            <div className="secondary-browser-container-1">
              <label className="label-button-align">
                <input
                  type="text"
                  name="location"
                  value={localizacion}
                  onChange={(e) => setLocalizacion(e.target.value)}
                  className="search-inputs"
                  placeholder="Localización"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    return setLocalizacion("");
                  }}
                >
                  <img src="/assets/x-button.png" alt="logo-borrado" />
                </button>
              </label>
              <label className="label-button-align">
                {/* <p>Movilidad</p> */}
                <select
                  id="movility"
                  name="movility"
                  onChange={(e) => setMovility(e.target.value)}
                  className="search-inputs"
                  defaultValue="Movilidad"
                >
                  <option id="color-input" disabled={true} value="Movilidad">
                    Movilidad
                  </option>
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
                  <img src="/assets/x-button.png" alt="logo-borrado" />
                </button>
              </label>
            </div>
            <div className="secondary-browser-container-2">
              <label className="label-button-align">
                <select
                  id="busco-musico"
                  name="busco-musico"
                  onChange={(e) => setLookingForMusician(e.target.value)}
                  className="search-inputs"
                  defaultValue="Busca Músico"
                  
                >
                  <option id="color-input" disabled={true} value="Busca Músico">
                    Busca Músico
                  </option>
                  <option value="si">Si</option>
                  <option value="no">No</option>
                </select>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    return setLookingForMusician("");
                  }}
                >
                  <img src="/assets/x-button.png" alt="logo-borrado" />
                </button>
              </label>

              <label className="label-button-align">
                <select
                  id="busco-actuacion"
                  name="busco-actuacion"
                  onChange={(e) => setLookingForGig(e.target.value)}
                  className="search-inputs"
                  defaultValue="Busca Actuación"
                >
                  <option id="color-input" disabled={true} value="Busca Actuación">
                    Busca Actuación
                  </option>
                  <option value="si">Si</option>
                  <option value="no">No</option>
                </select>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    return setLookingForGig("");
                  }}
                >
                  <img src="/assets/x-button.png" alt="logo-borrado" />
                </button>
              </label>
              <label className="label-button-align">
                <select
                  id="genero"
                  name="genero"
                  onChange={(e) => setGenre(e.target.value)}
                  className="search-inputs"
                  defaultValue="Género"
                >
                  <option id="color-input" disabled={true} value="Género">
                    Género
                  </option>
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
                  <img src="/assets/x-button.png" alt="logo-borrado" />
                </button>
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="musicians-browser-wrapper">
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
              val.localizacion
                .toLowerCase()
                .includes(localizacion.toLowerCase())
            ) {
              return true;
            }
            return false;
          })
          .filter((val) => {
            if (lookingForMusician === "") {
              return true;
            } else if (
              val.busco_solista.toLowerCase() ==
              lookingForMusician.toLowerCase()
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
      </div>
      {/* <Footer /> */}
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
    <Link className="link-musician" to={`/bands/${bandn.id_usuario}`}>
      <div
        className="individual-band"
        style={{
          backgroundImage: urlToShow,
          backgroundRepeat: "no-repeat",
          width: "350px",
          height: "200px",
        }}
      >
        <ul className="musicians-list">
          <li className="list">
            <span className="repo-text">{bandn.nombre_banda}</span>
          </li>
          <li className="list">
            <span className="repo-text">{bandn.localizacion}</span>
          </li>
          {/* <li className="list">
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
          </li> */}
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
