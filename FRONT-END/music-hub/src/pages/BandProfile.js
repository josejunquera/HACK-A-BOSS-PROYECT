import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ContactBand from "../components/ContactBand";
import "./BandProfile.css";

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
      <div className="individual-musician-profile-wrapper">
        <div
          className="individual-band-profile"
          style={{
            backgroundImage: urlToShow,
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "240px",
          }}
        >
          <ul className="musicians-list">
            <li className="list">
              <span>{bandInfo.nombre_banda} </span>
            </li>
            <li className="list">
              <span className="repo-text">{bandInfo.localizacion} </span>
            </li>
            {/* <li className="list">
              <span className="repo-text">{bandInfo.movilidad} </span>
            </li> */}
            {/* <li className="list">
              <span className="repo-text">
                Busco banda: {bandInfo.busco_solista}
              </span>
            </li>
            <li className="list">
              <span className="repo-text">
                Busco actuación: {bandInfo.busco_actuacion}
              </span>
            </li> */}
            <li className="list">
              <span className="repo-text">
                {bandGenres.map((genero) => {
                  return genero.nombre_genero + " ";
                })}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <ContactBand nombreBanda={bandInfo.nombre_banda} />

      <div className="musician-videos-container">
        {videoNames.map((video) => {
          return (
            <div key={video.split(".").shift()}>
              <p>{video.split(".").shift()}</p>

              <video
                controls
                height="200px"
                src={`http://localhost:3006/band-media/user${id_usuario}/${video}`}
                alt="avatar"
              ></video>
            </div>
          );
        })}
      </div>

      <div className="musician-audios-container">
        {audiosNames.map((audio) => {
          return (
            <div key={audio.split(".").shift()}>
              <p>{audio.split(".").shift()}</p>

              <audio
                controls
                src={`http://localhost:3006/band-media/user${id_usuario}/${audio}`}
                alt="avatar"
              ></audio>
            </div>
          );
        })}
      </div>
      <div className="artist-info-container">
        <p className="artist-info-container-title">INFORMACIÓN DE LA BANDA</p>
        <p className="artist-info-container-info">{bandInfo.descripcion}</p>
      </div>

      <Footer />
    </div>
  );
}

export default BandProfile;
