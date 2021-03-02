import React, { useState, useContext } from "react";
import { AuthContext } from "../App";

function UpdateVenueEvent() {
  const [venueEventName, setVenueEventName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();

    const newVenueEventServer = {
      nombreLocalEvento: venueEventName,
      localizacion: location,
      descripcion: description,
    };

    const res = await fetch("http://localhost:3000/api/v1/venues-events/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newVenueEventServer),
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
    <div className="create-venue-event">
      <form onSubmit={handleSubmit}>
        <label>
          <p>Nombre Local/Evento</p>
          <input
            type="text"
            name="venueEventName"
            value={venueEventName}
            onChange={(e) => setVenueEventName(e.target.value)}
          />
        </label>
        <label>
          <p>Localizacion</p>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
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
  );
}

export default UpdateVenueEvent;
