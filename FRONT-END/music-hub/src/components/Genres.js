import React, { useEffect, useState } from "react";

function Genres() {
  const [genres, setGenres] = useState([]);

  //   useEffect(() => {
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
  //   }, [genres]);

  return (
    <select>
      {genres.map((genre) => (
        <option key={genre.id_genero} value={genre.genero}>
          {genre.genero}
        </option>
      ))}
    </select>
  );
}

export default Genres;
