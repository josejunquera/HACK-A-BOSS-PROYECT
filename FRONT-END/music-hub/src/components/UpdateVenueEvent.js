import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../App";
import CreateVenueEvent from "./CreateVenueEvent";
import ProfileDeleteAlert from "./ProfileDeleteAlert";
import "./UpdateVenueEvent.css";

function UpdateVenueEvent() {
  const [venueEventName, setVenueEventName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [venueEventInfo, setVenueEventInfo] = useState("");
  const [token, setToken] = useContext(AuthContext);
  const [formState, setFormState] = useState("");

  useEffect(() => {
    const loadVenueEventInfo = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/venues-events/get-venue-event/`,
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
        setVenueEventInfo(body);
        setVenueEventName(body.nombre_local_evento);
        setLocation(body.localizacion);
        setDescription(body.descripcion);
        setFormState("activo");
      }
    };
    loadVenueEventInfo();
  }, [formState]);

  async function handleSubmit(event) {
    event.preventDefault();

    const newVenueEventServer = {
      nombreLocalEvento: venueEventName,
      localizacion: location,
      descripcion: description,
    };

    const res = await fetch("http://localhost:3000/api/v1/venues-events/", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newVenueEventServer),
    });
    if (res.status === 200) {
      const resMessage = await res.json();
      setResponse("Perfil actualizado correctamente");
    } else {
      const resMessage = await res.json();
      setResponse(resMessage.error);
    }
  }

  const jsxToReturn = venueEventInfo ? (
    <div className="update-venue-event-wrapper">
      <p className="update-venue-event-wrapper-p">
        EDITAR PERFIL DE LOCAL/EVENTO
      </p>

      <div className="update-venue-event">
        <form onSubmit={handleSubmit}>
          <label>
            <p>Nombre Local/Evento</p>
            <input
              type="text"
              name="venueEventName"
              value={venueEventName}
              onChange={(e) => setVenueEventName(e.target.value)}
              className="update-venue-event-form-input "
            />
          </label>
          <label>
            <p>Localizacion</p>
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="update-venue-event-form-input "
            />
          </label>
          <div>
            <label>
              <p>Descripción</p>
              <textarea
                placeholder="Introduce tu descripción de local o evento aquí"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="update-venue-event-form-input"
              />
            </label>
          </div>
          <div className="update-venue-event-button">
            <button type="submit">Guardar cambios</button>
          </div>
        </form>
        <div className="response-message-musician">{response}</div>
      </div>
      <div className="delete-venue">
        <ProfileDeleteAlert url="http://localhost:3000/api/v1/venues-events/" />
      </div>
    </div>
  ) : (
    <CreateVenueEvent />
  );

  return jsxToReturn;
}

export default UpdateVenueEvent;
