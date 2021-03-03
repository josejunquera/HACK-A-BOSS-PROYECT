import React, { useState, useContext } from "react";
import { AuthContext } from "../App";

function CreateMusician() {
  const [musicianName, setMusicianName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [location, setLocation] = useState("");
  const [movility, setMovility] = useState("local");
  const [lookingForBand, setLookingForBand] = useState("si");
  const [lookingForGig, setLookingForGig] = useState("si");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);

  async function handleSubmit(event) {
    const newMusicianServer = {
      nombreSolista: musicianName,
      especialidad: speciality,
      localizacion: location,
      movilidad: movility,
      buscoBanda: lookingForBand,
      buscoActuacion: lookingForGig,
      descripcion: description,
    };

    const res = await fetch("http://localhost:3000/api/v1/musicians/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newMusicianServer),
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
    <div className="create-musician">
      <form onSubmit={handleSubmit}>
        <label>
          <p>Nombre Solista</p>
          <input
            type="text"
            name="musicianName"
            value={musicianName}
            onChange={(e) => setMusicianName(e.target.value)}
          />
        </label>
        <label>
          <p>Especialidad</p>
          <input
            type="text"
            name="speciality"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          />
        </label>
        <label>
          <p>localizacion</p>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
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
        </label>
        <label>
          <p>Busco Banda</p>
          <select
            id="lookingForBand"
            name="lookingForBand"
            onChange={(e) => setLookingForBand(e.target.value)}
          >
            <option value="si">Si</option>
            <option value="no">No</option>
          </select>
        </label>
        <label>
          <p>Busco Actuación</p>
          <select
            id="lookingForGig"
            name="lookingForGig"
            onChange={(e) => setLookingForGig(e.target.value)}
          >
            <option value="si">Si</option>
            <option value="no">No</option>
          </select>
        </label>

        <div>
          <label>
            <p>Descripción</p>
            <textarea
              placeholder="Introduce tu descripción de músico aquí"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          {errorMsg && <div>{errorMsg}</div>}
        </div>
        <div>
          <button type="submit">Crear Músico</button>
        </div>
      </form>
    </div>
  );
}

export default CreateMusician;
