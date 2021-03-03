import React, { useState, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../App";
import CreateBand from "./CreateBand";

function UpdateBand() {
  const [bandName, setBandName] = useState("");
  const [location, setLocation] = useState("");
  const [movility, setMovility] = useState("local");
  const [lookingForMusician, setLookingForMusician] = useState("si");
  const [lookingForGig, setLookingForGig] = useState("si");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);
  const [bandInfo, setBandInfo] = useState("");
  const decodedToken = jwt_decode(token);
  const { id_usuario } = decodedToken;
  const [formState, setFormState] = useState("");

  useEffect(() => {
    const loadBandInfo = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/bands/get-band/`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const body = await response.json();
        setBandInfo(body);

        setBandName(bandInfo.nombre_banda);
        setLocation(bandInfo.localizacion);
        setMovility(bandInfo.movilidad);
        setLookingForMusician(bandInfo.busco_solista);
        setLookingForGig(bandInfo.busco_actuacion);
        setDescription(bandInfo.descripcion);
        setFormState("activo");
      }
    };
    loadBandInfo();
  }, [formState]);

  async function handleSubmit(event) {
    event.preventDefault();

    const newBandServer = {
      nombreBanda: bandName,
      localizacion: location,
      movilidad: movility,
      buscoSolista: lookingForMusician,
      buscoActuacion: lookingForGig,
      descripcion: description,
    };

    const res = await fetch("http://localhost:3000/api/v1/bands/", {
      method: "PUT",
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

  const jsxToReturn = bandInfo ? (
    <div className="create-band">
      <form onSubmit={handleSubmit}>
        <label>
          <p>Nombre Banda</p>
          <input
            type="text"
            name="bandName"
            value={bandName}
            onChange={(e) => setBandName(e.target.value)}
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
          <p>Busco Músico</p>
          <select
            id="lookingForMusician"
            name="lookingForMusician"
            onChange={(e) => setLookingForMusician(e.target.value)}
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
          <button type="submit">Guardar cambios</button>
        </div>
      </form>
    </div>
  ) : (
    <CreateBand />
  );
  return jsxToReturn;
}

export default UpdateBand;
