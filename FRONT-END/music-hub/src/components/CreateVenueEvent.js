import React, { useState, useContext } from "react";
import { AuthContext } from "../App";
import "./CreateVenueEvent.css";

function CreateVenueEvent() {
  const [venueEventName, setVenueEventName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);

  async function handleSubmit(event) {
    const newVenueEventServer = {
      nombreLocalEvento: venueEventName,
      localizacion: location,
      descripcion: description,
    };

    const res = await fetch("http://localhost:3000/api/v1/venues-events/add", {
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
    <div className="create-venue-event-wrapper">
            <p className="create-band-wrapper-p">CREAR PERFIL DE LOCAL/EVENTO</p>

      <div className="create-venue-event">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="venueEventName"
              value={venueEventName}
              onChange={(e) => setVenueEventName(e.target.value)}
              placeholder="Nombre del Local/Evento"
              className="create-venue-event-form-input margin-input"
            />
          </label>
          <label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Localización"
              className="create-venue-event-form-input margin-input"
            />
          </label>
          <div>
            <label>
              <p>Descripción</p>
              <textarea
                placeholder="Introduce tu descripción de local/evento aquí"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="create-venue-event-form-input"
              />
            </label>
            {errorMsg && <div>{errorMsg}</div>}
          </div>
          <div className="create-venue-event-button">
            <button type="submit">Crear Local/Evento</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateVenueEvent;
