import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../App";
import "./ContactMusician.css";

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
    <button style={{backgroundColor:" rgb(238, 236, 236)",color:"black"}} disabled={true}>Crea una banda para contactar</button>
  );

  const buttonContactVenueEventToMusician = venueEventInfo.nombre_local_evento ? (
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
          {buttonContactBandToMusician}
          {buttonContactVenueEventToMusician}
        </div>
      </form>
    </div>
  );
}

export default ContactMusician;
