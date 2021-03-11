import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";

function Messages() {
  const [token, setToken] = useContext(AuthContext);
  const [musicianContracts, setMusicianContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(0);
  const [venueEventName, setVenueEventName] = useState([]);

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
  }, [token]);

  //   useEffect(() => {
  const loadVenueEventName = async (test) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/venues-events/get-venue-event-name/${test}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const body = await response.json();
      //   setVenueEventName(body);
    }
  };
  // loadVenueEventName();
  //   }, []);
  //   console.log(venueEventName);
  //   console.log(musicianContracts);
  //   console.log(selectedContract);
  return (
    <ul>
      {musicianContracts.map((contract) => (
        <div>
          <li>
            {contract.contrato}
            {contract.fecha}
            {contract.id_local_evento}
            {contract.respuesta}
            {loadVenueEventName(contract.id_local_evento)}
          </li>
          <button onClick={(e) => setSelectedContract(contract.id_contrato)}>
            X
          </button>
        </div>
      ))}
    </ul>
  );
}

export default Messages;
