import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function MusicanProfile() {
  const { id_usuario } = useParams();
  const [musicianInfo, setMusicianInfo] = useState([]);
  const [musicianMedia, setMusicianMedia] = useState([]);
  const [musicianVideo, setMusicianVideo] = useState([]);
  const [musicianAudio, setMusicianAudio] = useState([]);
  const [musicianGenres, setMusicianGenres] = useState([]);

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

  const coverImageName = musicianMedia
    .filter((element) => {
      return element.titulo === "CoverImage";
    })
    .map((element) => {
      return element.url.split("/").pop();
    });

  console.log(coverImageName);

  const urlCoverImage = coverImageName
    ? `url(http://localhost:3006/musicians-media/user${id_usuario}/${coverImageName})`
    : `url(http://localhost:3006/users-media/CoverImage.jpg)`;

  return (
    <div>
      <NavBar />

      <div
        style={{
          backgroundImage: urlCoverImage,
          backgroundRepeat: "no-repeat",
          width: "250px",
        }}
      >
        <ul className="musicians-list">
          <li className="list">
            <span className="repo-text">{musicianInfo.nombre_solista} </span>
          </li>
          <li className="list">
            <span className="repo-text">{musicianInfo.localizacion} </span>
          </li>
          <li className="list">
            <span className="repo-text">{musicianInfo.especialidad} </span>
          </li>
          <li className="list">
            <span className="repo-text">{musicianInfo.movilidad} </span>
          </li>
          <li className="list">
            <span className="repo-text">
              Busco banda: {musicianInfo.busco_banda}
            </span>
          </li>
          <li className="list">
            <span className="repo-text">
              Busco actuación: {musicianInfo.busco_actuacion}
            </span>
          </li>
          <li className="list">
            <span className="repo-text">
              {musicianGenres.map((genero) => {
                return genero.nombre_genero + " ";
              })}
            </span>
          </li>
        </ul>
      </div>
      <div>
        {audiosNames.map((audio) => {
          return (
            <audio
              controls
              src={`http://localhost:3006/musicians-media/user${id_usuario}/${audio}`}
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
              src={`http://localhost:3006/musicians-media/user${id_usuario}/${video}`}
              alt="avatar"
            ></video>
          );
        })}
      </div>
      <div>{musicianInfo.descripcion}</div>

      <Footer />
    </div>
  );
}

export default MusicanProfile;
