import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import MessagesBand from "./MessagesBand";
import MessagesMusician from "./MessagesMusician";
import MessagesVenueEvent from "./MessagesVenueEvent";

function Messages() {
  const [token, setToken] = useContext(AuthContext);
  const [musicianInfo, setMusicianInfo] = useState("");
  const [bandInfo, setBandInfo] = useState("");
  const [venueEventInfo, setVenueEventInfo] = useState("");

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
  }, []);

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
  }, []);

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
      }
    };
    loadVenueEventInfo();
  }, []);

  const jsxToReturnMusician = musicianInfo.nombre_solista ? (
    <MessagesMusician />
  ) : (
    <div></div>
  );
  const jsxToReturnBand = bandInfo.nombre_banda ? (
    <MessagesBand />
  ) : (
    <div></div>
  );
  const jsxToReturnVenueEvent = venueEventInfo.nombre_local_evento ? (
    <MessagesVenueEvent />
  ) : (
    <div></div>
  );

  const jsxToReturnNotProfiles =
    !musicianInfo.nombre_solista &&
    !bandInfo.nombre_banda &&
    !venueEventInfo.nombre_local_evento ? (
      <p>No tienes ningún perfil configurado</p>
    ) : (
      <div></div>
    );

  return (
    <div>
      {jsxToReturnMusician}
      {jsxToReturnBand}
      {jsxToReturnVenueEvent}
      {jsxToReturnNotProfiles}
    </div>
  );
}

export default Messages;
