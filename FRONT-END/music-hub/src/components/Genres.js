import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";

function Genres(props) {
  const [genres, setGenres] = useState([]);
  const [genreToAdd, setGenreToAdd] = useState("Rock");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);
  const { url } = props;

  useEffect(() => {
    const loadMusician = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/musicians/get-genres"
      );
      if (response.status === 200) {
        const body = await response.json();
        setGenres(body);
      }
    };
    loadMusician();
  }, [genres]);

  const loadGenresOfMusician = async () => {
    const response = await fetch("url");
  };

  async function handleSubmit(event) {
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
      <ul>
        <li></li>
      </ul>
    </div>
  );
}

export default Genres;
