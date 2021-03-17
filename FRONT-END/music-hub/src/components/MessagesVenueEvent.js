import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import "./MessagesMusician.css";

function MessagesVenueEvent() {
  const [token, setToken] = useContext(AuthContext);
  const [bandContracts, setBandContracts] = useState([]);
  const [musicianContracts, setMusicianContracts] = useState([]);

  useEffect(() => {
    const loadVenueEventContracts = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/venues-events/contracts`,
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
        setMusicianContracts(body.musicianContracts);
        setBandContracts(body.bandContracts);
      }
    };
    loadVenueEventContracts();
  }, [token]);

  const jsxToReturnMusicians = musicianContracts[0] ? (
    <div>
      <ul>
        {musicianContracts.map((contract) => (
          <div key={contract.id_contrato} className="message">
            <li>{contract.nombre_solista}</li>
            <li>{contract.fecha.split("T").shift()}</li>
            <li>{contract.respuesta}</li>
            <li>{contract.contrato}</li>
          </div>
        ))}
      </ul>
    </div>
  ) : (
    <p>No tienes soliticudes de contratacion a solistas</p>
  );

  const jsxToReturnBands = bandContracts[0] ? (
    <div>
      <ul>
        {bandContracts.map((contract) => (
          <div key={contract.id_contrato} className="message">
            <li>{contract.nombre_banda}</li>
            <li>{contract.fecha.split("T").shift()}</li>
            <li>{contract.respuesta}</li>
            <li>{contract.contrato}</li>
          </div>
        ))}
      </ul>
    </div>
  ) : (
    <p className="div-musician-messages-small">
      No tienes soliticudes de contratacion a bandas
    </p>
  );

  return (
    <div>
      <p id="solicitudes-contratacion">
        ESTADO DE LAS SOLICITUDES DE CONTRATACIÓN
      </p>
      <p className="div-musician-messages-center">
        SOLICITUDES DE CONTRATACIÓN A SOLISTAS
      </p>
      {jsxToReturnMusicians}

      <p className="div-musician-messages-center">
        SOLICITUDES DE CONTRATACIÓN A BANDAS
      </p>
      {jsxToReturnBands}
    </div>
  );
}

export default MessagesVenueEvent;
