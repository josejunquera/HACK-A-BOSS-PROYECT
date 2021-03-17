import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import "./Genres.css";

function Genres(props) {
  const [genres, setGenres] = useState([]);
  const [genresOfArtist, setGenresOfArtist] = useState([]);
  const [genreToAdd, setGenreToAdd] = useState("Rock");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);
  const { url, urlGetGenres, urlDeleteGenres } = props;
  const [genreReloader, setGenreReloader] = useState(1);
  const refreshGenres = () => setGenreReloader(Math.random());

  useEffect(() => {
    const loadGenres = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/musicians/get-genres"
      );
      if (response.status === 200) {
        const body = await response.json();
        setGenres(body);
      }
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const loadGenresOfArtist = async () => {
      const response = await fetch(urlGetGenres, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const body = await response.json();
        setGenresOfArtist(body);
      }
    };
    loadGenresOfArtist();
  }, [token, urlGetGenres, genreReloader]);

  async function handleSubmit(event) {
    event.preventDefault();
    const genreSelected = {
      genero: genreToAdd,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(genreSelected),
    });
    if (res.status === 201) {
      const resMessage = await res.json();
      setResponse(resMessage);
      refreshGenres();
    } else {
      const resMessage = await res.json();
      setErrorMsg(resMessage.error);
    }
  }

  return (
    <div className="genres">
      <div className="add-genres">
        <form onSubmit={handleSubmit}>
          <select
            onChange={(e) => setGenreToAdd(e.target.value)}
            className="genre-form-input"
          >
            {genres.map((genre) => (
              <option key={genre.id_genero} value={genre.genero}>
                {genre.genero}
              </option>
            ))}
          </select>
          <button className="add-genres-button" type="submit">
            Añadir género
          </button>
        </form>
      </div>

      <div className="show-genres">
        {genresOfArtist.map((genre) => {
          return (
            <div key={genre.nombre_genero}className="genres-container">
              <ul  className="genres-list">
                <li className="list">
                  <span className="repo-text">{genre.nombre_genero}</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={async function deleteGenre() {
                  await fetch(urlDeleteGenres, {
                    method: "DELETE",
                    headers: {
                      "Content-type": "application/json",

                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      genero: genre.nombre_genero,
                    }),
                  });
                  refreshGenres();
                }}
              >
                <img src="/assets/x-button.png" alt="logo-borrado" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Genres;
