import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";

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
  console.log(musicianContracts);
  console.log(bandContracts);

  //   console.log(contracts);
  //   console.log(contracts.musicianContracts);
  //   console.log(contracts.bandContracts);

  const jsxToReturnMusicians = musicianContracts[0] ? (
    <div>
      <ul>
        {musicianContracts.map((contract) => (
          <div>
            <li>
              {contract.contrato}
              {contract.fecha}
              {contract.id_local_evento}
              {contract.respuesta}
              {contract.nombre_solista}
            </li>
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
          <div>
            <li>
              {contract.contrato}
              {contract.fecha}
              {contract.id_local_evento}
              {contract.respuesta}
              {contract.nombre_banda}
            </li>
          </div>
        ))}
      </ul>
    </div>
  ) : (
    <p>No tienes soliticudes de contratacion a bandas</p>
  );

  return (
    <div>
      <h1>Estado de solicitudes de contratación</h1>
      <h2>Solicitudes de contratacion a solistas</h2>
      {jsxToReturnMusicians}

      <h2>Solicitudes de contratacion a bandas</h2>
      {jsxToReturnBands}
    </div>
  );
}

export default MessagesVenueEvent;
