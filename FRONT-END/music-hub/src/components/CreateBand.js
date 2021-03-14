import React, { useState, useContext } from "react";
import { AuthContext } from "../App";
import "./CreateBand.css";

function CreateBand() {
  const [bandName, setBandName] = useState("");
  const [location, setLocation] = useState("");
  const [movility, setMovility] = useState("local");
  const [lookingForMusician, setLookingForMusician] = useState("si");
  const [lookingForGig, setLookingForGig] = useState("si");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);

  async function handleSubmit(event) {
    const newBandServer = {
      nombreBanda: bandName,
      localizacion: location,
      movilidad: movility,
      buscoSolista: lookingForMusician,
      buscoActuacion: lookingForGig,
      descripcion: description,
    };

    const res = await fetch("http://localhost:3000/api/v1/bands/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBandServer),
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
    <div className="create-band-wrapper">
      <p className="create-band-wrapper-p">CREAR PERFIL DE BANDA</p>

      <div className="create-band">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="create-band-form-input margin-input"
              type="text"
              name="bandName"
              value={bandName}
              onChange={(e) => setBandName(e.target.value)}
              placeholder="Nombre de la Banda"
            />
          </label>
          <label>
            <input
              className="create-band-form-input margin-input"
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Localización"
            />
          </label>
          <label>
            <p>Movilidad</p>
            <select
              id="movility"
              name="movility"
              onChange={(e) => setMovility(e.target.value)}
              className="create-band-form-input"
            >
              <option value="local">Local</option>
              <option value="provincial">Provincial</option>
              <option value="nacional">Nacional</option>
              <option value="internacional">Internacional</option>
            </select>
          </label>
          <label>
            <p>Busco Músico</p>
            <select
              id="lookingForMusician"
              name="lookingForMusician"
              onChange={(e) => setLookingForMusician(e.target.value)}
              className="create-band-form-input "
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
              className="create-band-form-input "
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
                className="create-band-form-input "
              />
            </label>
            {errorMsg && <div>{errorMsg}</div>}
          </div>
          <div className="create-band-button">
            <button type="submit">Crear Banda</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBand;
