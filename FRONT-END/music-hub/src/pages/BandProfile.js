import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ContactBand from "../components/ContactBand";

function BandProfile() {
  const { id_usuario } = useParams();
  const [bandInfo, setBandInfo] = useState([]);
  const [bandMedia, setBandMedia] = useState([]);
  const [bandGenres, setBandGenres] = useState([]);
  const [urlCoverImage, setUrlCoverImage] = useState("");

  useEffect(() => {
    const loadBandInfo = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/bands/get-band/${id_usuario}`
      );
      if (response.status === 200) {
        const body = await response.json();
        setBandInfo(body);
      }
    };
    loadBandInfo();
  }, []);

  useEffect(() => {
    const loadBandMedia = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/bands/get-media/${id_usuario}`
      );
      if (response.status === 200) {
        const body = await response.json();
        setBandMedia(body);
      }
    };
    loadBandMedia();
  }, []);

  useEffect(() => {
    const loadBandGenres = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/bands/get-band-genres/${id_usuario}`
      );
      if (response.status === 200) {
        const body = await response.json();
        setBandGenres(body);
      }
    };
    loadBandGenres();
  }, []);

  const audiosNames = bandMedia
    .filter((element) => {
      return element.tipo === "audio";
    })
    .map((element) => {
      return element.url.split("/").pop();
    });

  const videoNames = bandMedia
    .filter((element) => {
      return element.tipo === "video";
    })
    .map((element) => {
      return element.url.split("/").pop();
    });

  const url = `http://localhost:3006/band-media/user${bandInfo.id_usuario}/CoverImage.`;

  useEffect(() => {
    const loadCoverImage = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/bands/get-cover-image/${bandInfo.id_banda}`
      );
      if (response.status === 200) {
        const body = await response.json();
        setUrlCoverImage(body.url);
      }
    };
    loadCoverImage();
  }, [bandInfo]);

  const urlToShow = urlCoverImage
    ? `url(${url}${urlCoverImage.split(".").pop()})`
    : `url(http://localhost:3006/users-media/CoverImage.jpg)`;

  return (
    <div>
      <NavBar />

      <div
        style={{
          backgroundImage: urlToShow,
          backgroundRepeat: "no-repeat",
          width: "250px",
        }}
      >
        <ul className="bands-list">
          <li className="list">
            <span className="repo-text">{bandInfo.nombre_banda} </span>
          </li>
          <li className="list">
            <span className="repo-text">{bandInfo.localizacion} </span>
          </li>
          <li className="list">
            <span className="repo-text">{bandInfo.movilidad} </span>
          </li>
          <li className="list">
            <span className="repo-text">
              Busco banda: {bandInfo.busco_solista}
            </span>
          </li>
          <li className="list">
            <span className="repo-text">
              Busco actuación: {bandInfo.busco_actuacion}
            </span>
          </li>
          <li className="list">
            <span className="repo-text">
              {bandGenres.map((genero) => {
                return genero.nombre_genero + " ";
              })}
            </span>
          </li>
        </ul>
      </div>
      <ContactBand nombreBanda={bandInfo.nombre_banda} />

      <div>
        {audiosNames.map((audio) => {
          return (
            <audio
              controls
              src={`http://localhost:3006/band-media/user${id_usuario}/${audio}`}
              alt="avatar"
            ></audio>
          );
        })}
      </div>

      <div>
        {videoNames.map((video) => {
          return (
            <video
              controls
              height="200px"
              src={`http://localhost:3006/band-media/user${id_usuario}/${video}`}
              alt="avatar"
            ></video>
          );
        })}
      </div>
      <div>{bandInfo.descripcion}</div>

      <Footer />
    </div>
  );
}

export default BandProfile;
