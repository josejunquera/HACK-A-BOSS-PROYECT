import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../App";

function ContactBand(props) {
  const [token, setToken] = useContext(AuthContext);
  const [musicianInfo, setMusicianInfo] = useState([]);
  const [venueEventInfo, setVenueEventInfo] = useState([]);
  const [message, setMessage] = useState("");
  const { nombreBanda } = props;

  useEffect(() => {
    const loadMusicianInfo = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/musicians/get-musician/`,
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
        setMusicianInfo(body);
      }
    };
    loadMusicianInfo();
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

  const sendMessageAsMusician = async () => {
    const messageToSend = {
      nombreBanda: nombreBanda,
      mensaje: message,
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/musicians/contact-band`,
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
      nombreBanda: nombreBanda,
      contrato: message,
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/venues-events/contract-band`,
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


  const buttonContactMusicianToBand = musicianInfo.nombre_solista ? (
    <button onClick={sendMessageAsMusician}>Enviar mensaje como solista</button>
  ) : (
    <button style={{backgroundColor:" rgb(238, 236, 236)",color:"black"}} disabled={true}>Crea un solista para contactar</button>
  );

  const buttonContactVenueEventToBand = venueEventInfo.nombre_local_evento ? (
    <button onClick={sendMessageAsVenue}>
      Enviar mensaje como local/evento
    </button>
  ) : (
    <button style={{backgroundColor:" rgb(238, 236, 236)",color:"black"}} disabled={true}>Crea un local/evento para contratar</button>
  );

  function myFunction() {
    const x = document.getElementById("form");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  return (
    <div className="contact-musician-container">
      <div>
        <button className="contact-musician-button" onClick={myFunction}>
          CONTACTAR{" "}
        </button>
      </div>
      <form id="form">
        <div className="contact-musician-textarea-container">
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            className="contact-musician-textarea"
            placeholder="Escribe tu mensaje aquí..."
          ></textarea>
        </div>
        <div className="contact-musician-buttons-container">
          {buttonContactMusicianToBand}
          {buttonContactVenueEventToBand}
        </div>
      </form>
    </div>
  );
}

export default ContactBand;
