import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";

function Genres(props) {
  const [genres, setGenres] = useState([]);
  const [genresOfArtist, setGenresOfArtist] = useState([]);
  const [genreToAdd, setGenreToAdd] = useState("Rock");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);
  const { url, urlGetGenres, urlDeleteGenres } = props;

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
  }, [genres]);

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
  }, [genresOfArtist]);

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
    } else {
      const resMessage = await res.json();
      setErrorMsg(resMessage.error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setGenreToAdd(e.target.value)}>
          {genres.map((genre) => (
            <option key={genre.id_genero} value={genre.genero}>
              {genre.genero}
            </option>
          ))}
        </select>
        <button type="submit">Añadir género</button>
      </form>

      {genresOfArtist.map((genre) => {
        return (
          <>
            <ul key={genre.nombre_genero} className="musicians-list">
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
              }}
            >
              Borrar género
            </button>
          </>
        );
      })}
    </div>
  );
}

export default Genres;
