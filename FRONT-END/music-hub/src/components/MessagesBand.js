import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import "./MessagesMusician.css";
function MessagesBand() {
  const [token, setToken] = useContext(AuthContext);
  const [bandContracts, setBandContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(0);
  const [venueEventName, setVenueEventName] = useState([]);
  const [message, setMessage] = useState("");
  const [contractResponse, setContractResponse] = useState("");
  const [messagesReloader, setMessagesReloader] = useState(1);
  const [response, setResponse] = useState("");

  const refreshMessages = () => setMessagesReloader(Math.random());

  useEffect(() => {
    const loadBandContracts = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/bands/contracts`,
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
        setBandContracts(body);
      }
    };
    loadBandContracts();
  }, [token, messagesReloader]);

  const replyContract = async () => {
    const replyMessage = {
      idContrato: selectedContract,
      mensaje: message,
      respuestaSolicitud: contractResponse,
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/bands/contract-reply`,
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

  const jsxToReturn = bandContracts[0] ? (
    <>
      <div>
        <ul>
          {bandContracts.map((contract) => (
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
      No tienes solicitudes de contratacion como banda
    </p>
  );

  return (
    <div className="div-musician-messages">
      <p>SOLICITUDES DE CONTRATACIÓN COMO BANDA</p>
      {jsxToReturn}
    </div>
  );
}

export default MessagesBand;
