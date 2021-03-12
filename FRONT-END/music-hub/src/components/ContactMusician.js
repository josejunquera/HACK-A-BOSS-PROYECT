import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../App";

function ContactMusician(props) {
  const [token, setToken] = useContext(AuthContext);
  const [bandInfo, setBandInfo] = useState([]);
  const [venueEventInfo, setVenueEventInfo] = useState([]);
  const [message, setMessage] = useState("");
  const { nombreSolista } = props;

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
      }
    };
    loadBandInfo();
  }, [token]);

  useEffect(() => {
    const loadVenueInfo = async () => {
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
      }
    };
    loadVenueInfo();
  }, [token]);

  const sendMessageAsBand = async () => {
    const messageToSend = {
      nombreSolista: nombreSolista,
      mensaje: message,
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/bands/contact-musician`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageToSend),
      }
    );
    if (response.status === 200) {
    }
  };

  const sendMessageAsVenue = async () => {
    const messageToSend = {
      nombreSolista: nombreSolista,
      contrato: message,
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/venues-events/contract-musician`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageToSend),
      }
    );
    if (response.status === 200) {
    }
  };

  const buttonContactBandToMusician = bandInfo.nombre_banda ? (
    <button onClick={sendMessageAsBand}>Enviar mensaje como banda</button>
  ) : (
    <div>No tiene perfil de banda</div>
  );

  const buttonContactVenueEventToMusician = venueEventInfo.nombre_local_evento ? (
    <button onClick={sendMessageAsVenue}>
      Enviar mensaje como local/evento
    </button>
  ) : (
    <div>No tiene perfil de local/evento</div>
  );

  return (
    <div>
      <form>
        <textarea onChange={(e) => setMessage(e.target.value)}></textarea>
        {buttonContactBandToMusician}
        {buttonContactVenueEventToMusician}
      </form>
    </div>
  );
}

export default ContactMusician;