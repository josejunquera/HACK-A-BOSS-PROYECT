import "./MusicianProfile.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ContactMusician from "../components/ContactMusician";

function MusicanProfile() {
  const { id_usuario } = useParams();
  const [musicianInfo, setMusicianInfo] = useState([]);
  const [musicianMedia, setMusicianMedia] = useState([]);
  const [musicianGenres, setMusicianGenres] = useState([]);
  const [urlCoverImage, setUrlCoverImage] = useState("");

  useEffect(() => {
    const loadMusicianInfo = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/musicians/get-musician/${id_usuario}`
      );
      if (response.status === 200) {
        const body = await response.json();
        setMusicianInfo(body);
      }
    };
    loadMusicianInfo();
  }, []);

  useEffect(() => {
    const loadMusicianMedia = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/musicians/get-media/${id_usuario}`
      );
      if (response.status === 200) {
        const body = await response.json();
        setMusicianMedia(body);
      }
    };
    loadMusicianMedia();
  }, []);

  useEffect(() => {
    const loadMusicianGenres = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/musicians/get-musician-genres/${id_usuario}`
      );
      if (response.status === 200) {
        const body = await response.json();
        setMusicianGenres(body);
      }
    };
    loadMusicianGenres();
  }, []);

  const audiosNames = musicianMedia
    .filter((element) => {
      return element.tipo === "audio";
    })
    .map((element) => {
      return element.url.split("/").pop();
    });

  const videoNames = musicianMedia
    .filter((element) => {
      return element.tipo === "video";
    })
    .map((element) => {
      return element.url.split("/").pop();
    });

  const url = `http://localhost:3006/musicians-media/user${musicianInfo.id_usuario}/CoverImage.`;

  useEffect(() => {
    const loadCoverImage = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/musicians/get-cover-image/${musicianInfo.id_solista}`
      );
      if (response.status === 200) {
        const body = await response.json();
        setUrlCoverImage(body.url);
      }
    };
    loadCoverImage();
  }, [musicianInfo]);

  const urlToShow = urlCoverImage
    ? `url(${url}${urlCoverImage.split(".").pop()})`
    : `url(http://localhost:3006/users-media/CoverImage.jpg)`;

  return (
    <div>
      <NavBar />
      <div className="individual-musician-profile-wrapper">
        <div
          className="individual-musician-profile"
          style={{
            backgroundImage: urlToShow,
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "240px",
          }}
        >
          <ul className="musicians-list">
            <li className="list">
              <span>{musicianInfo.nombre_solista} </span>
            </li>
            <li className="list">
              <span>{musicianInfo.localizacion} </span>
            </li>
            <li className="list">
              <span>{musicianInfo.especialidad} </span>
            </li>
            {/* <li className="list">
              <span>Movilidad {musicianInfo.movilidad} </span>
            </li> */}
            {/* <li className="list">
              <span>Busco banda: {musicianInfo.busco_banda}</span>
            </li>
            <li className="list">
              <span>Busco actuación: {musicianInfo.busco_actuacion}</span>
            </li> */}
            <li className="list">
              <span>
                {musicianGenres.map((genero) => {
                  return genero.nombre_genero + " ";
                })}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <ContactMusician nombreSolista={musicianInfo.nombre_solista} />

      <div className="musician-videos-container">
        {videoNames.map((video) => {
          return (
            <div key={video.split(".").shift()}>
              <p>{video.split(".").shift()}</p>

              <video
                controls
                height="200px"
                src={`http://localhost:3006/musicians-media/user${id_usuario}/${video}`}
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
                src={`http://localhost:3006/musicians-media/user${id_usuario}/${audio}`}
                alt="avatar"
              ></audio>
            </div>
          );
        })}
      </div>
      <div className="artist-info-container">
        <p className="artist-info-container-title">INFORMACIÓN DEL ARTISTA</p>
        <p className="artist-info-container-info">{musicianInfo.descripcion}</p>
      </div>

      <Footer />
    </div>
  );
}

export default MusicanProfile;
