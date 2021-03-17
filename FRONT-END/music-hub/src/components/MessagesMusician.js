import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import "./MessagesMusician.css";
function MessagesMusician() {
  const [token, setToken] = useContext(AuthContext);
  const [musicianContracts, setMusicianContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(0);
  const [venueEventName, setVenueEventName] = useState([]);
  const [message, setMessage] = useState("");
  const [contractResponse, setContractResponse] = useState("");
  const [messagesReloader, setMessagesReloader] = useState(1);
  const refreshMessages = () => setMessagesReloader(Math.random());
  const [response, setResponse] = useState("");

  useEffect(() => {
    const loadMusicianContracts = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/musicians/contracts`,
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
        setMusicianContracts(body);
      }
    };
    loadMusicianContracts();
  }, [token, messagesReloader]);

  const replyContract = async () => {
    const replyMessage = {
      idContrato: selectedContract,
      mensaje: message,
      respuestaSolicitud: contractResponse,
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/musicians/contract-reply`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(replyMessage),
      }
    );
    if (response.status === 200) {
      setResponse("Mensaje enviado");

      refreshMessages();
    }
  };

  const jsxToReturn = musicianContracts[0] ? (
    <>
      <div>
        <ul>
          {musicianContracts.map((contract) => (
            <div key={contract.id_contrato} className="message">
              <li>{contract.nombre_local_evento}</li>
              <li>{contract.fecha.split("T").shift()}</li>
              <li>{contract.contrato}</li>
              <li>Estado: {contract.respuesta}</li>
              <button
                className="select-button"
                onClick={(e) => setSelectedContract(contract.id_contrato)}
              >
                Seleccionar mensaje
              </button>
            </div>
          ))}
        </ul>
        <form className="musician-reply-form">
          <textarea
            placeholder="Introduce tu mensaje aquí"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <select onChange={(e) => setContractResponse(e.target.value)}>
            <option value="Pendiente">Pendiente</option>
            <option value="Aceptada">Aceptada</option>
            <option value="Rechazada">Rechazada</option>
          </select>
        </form>
        <button className="musician-reply-button" onClick={replyContract}>
          Responder solicitud
        </button>
      </div>
      <div className="response-message-musician">
        {response && <div>{response}</div>}
      </div>
    </>
  ) : (
    <p className="div-musician-messages-small">
      No tienes solicitudes de contratacion como solista
    </p>
  );

  return (
    <div className="div-musician-messages">
      <p>SOLICITUDES DE CONTRATACIÓN COMO SOLISTA</p>
      {jsxToReturn}
    </div>
  );
}

export default MessagesMusician;
