import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../App";
import AlertDialog from "./AlertDialog";
import CreateVenueEvent from "./CreateVenueEvent";

function UpdateVenueEvent() {
  const [venueEventName, setVenueEventName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
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
        setVenueEventName(venueEventInfo.nombre_local_evento);
        setLocation(venueEventInfo.localizacion);
        setDescription(venueEventInfo.descripcion);
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
    if (res.status === 201) {
      const resMessage = await res.json();
      setResponse(resMessage);
    } else {
      const resMessage = await res.json();
      setErrorMsg(resMessage.error);
    }
  }

  const jsxToReturn = venueEventInfo ? (
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
              placeholder="Introduce tu descripción de local o evento aquí"
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
      <AlertDialog url="http://localhost:3000/api/v1/venues-events/" />
    </div>
  ) : (
    <CreateVenueEvent />
  );

  return jsxToReturn;
}

export default UpdateVenueEvent;
