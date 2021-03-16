import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../App";
import CreateMusicians from "./CreateMusicians";
import Genres from "./Genres";
import ProfileDeleteAlert from "./ProfileDeleteAlert";
import ProfileMedia from "./ProfileMedia";
import { UploadCoverImage } from "./UploadCoverImage";
import { UploadMedia } from "./UploadMedia";
import "./UpdateMusician.css";

function UpdateMusician() {
  const [musicianName, setMusicianName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [location, setLocation] = useState("");
  const [movility, setMovility] = useState("");
  const [lookingForBand, setLookingForBand] = useState("");
  const [lookingForGig, setLookingForGig] = useState("");
  const [description, setDescription] = useState("");
  const [musicianInfo, setMusicianInfo] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);
  const [formState, setFormState] = useState("");
  const [mediaReloader, setMediaReloader] = useState(1);
  const refreshMultimedia = () => setMediaReloader(Math.random());

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
        setMusicianName(body.nombre_solista);
        setLocation(body.localizacion);
        setSpeciality(body.especialidad);
        setMovility(body.movilidad);
        setLookingForBand(body.busco_banda);
        setLookingForGig(body.busco_actuacion);
        setDescription(body.descripcion);
        setFormState("activo");
      }
    };
    loadMusicianInfo();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const newMusicianServer = {
      nombreSolista: musicianName,
      especialidad: speciality,
      localizacion: location,
      movilidad: movility,
      buscoBanda: lookingForBand,
      buscoActuacion: lookingForGig,
      descripcion: description,
    };

    const res = await fetch("http://localhost:3000/api/v1/musicians/", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newMusicianServer),
    });
    if (res.status === 200) {
      const resMessage = await res.json();
      setResponse(resMessage);
    } else {
      const resMessage = await res.json();
      setResponse(resMessage.error);
    }
  }

  const jsxToReturn = musicianInfo ? (
    <div className="update-musician-wrapper">
      <p className="update-musician-wrapper-p">EDITAR PERFIL DE MÚSICO</p>

      <div className="update-musician">
        <form onSubmit={handleSubmit}>
          <label>
            <p>Nombre Solista</p>
            <input
              type="text"
              name="musicianName"
              value={musicianName}
              onChange={(e) => setMusicianName(e.target.value)}
              className="update-musician-form-input"
            />
          </label>
          <label>
            <p>Especialidad</p>
            <input
              type="text"
              name="speciality"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="update-musician-form-input"
            />
          </label>
          <label>
            <p>Localizacion</p>
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="update-musician-form-input"
            />
          </label>
          <label>
            <p>Movilidad</p>
            <select
              id="movility"
              name="movility"
              onChange={(e) => setMovility(e.target.value)}
              className="update-musician-form-input"
            >
              <option value={musicianInfo.movilidad}>
                Actual: {musicianInfo.movilidad}
              </option>

              <option value="local">Local</option>
              <option value="provincial">Provincial</option>
              <option value="nacional">Nacional</option>
              <option value="internacional">Internacional</option>
            </select>
          </label>
          <label>
            <p>Busco Banda</p>
            <select
              id="lookingForBand"
              name="lookingForBand"
              onChange={(e) => setLookingForBand(e.target.value)}
              className="update-musician-form-input"
            >
              <option value={musicianInfo.busco_banda}>
                Actual: {musicianInfo.busco_banda}
              </option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </label>
          <label>
            <p>Busco Actuación</p>
            <select
              id="lookingForGig"
              name="lookingForGig"
              onChange={(e) => setLookingForGig(e.target.value)}
              className="update-musician-form-input"
            >
              <option value={musicianInfo.busco_actuacion}>
                Actual: {musicianInfo.busco_actuacion}
              </option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </label>

          <div>
            <label>
              <p>Descripción</p>
              <textarea
                placeholder="Introduce tu descripción de músico aquí"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="update-musician-form-input"
              />
            </label>
          </div>
          <div>
            <div className="update-musician-button">
              <button type="submit">Guardar Cambios</button>
            </div>
          </div>
        </form>
        <div className="response-message-musician">{response.message}</div>
      </div>

      <p className="update-musician-wrapper-p">EDITAR GÉNEROS</p>

      <Genres
        url="http://localhost:3000/api/v1/musicians/addgenre/"
        urlGetGenres="http://localhost:3000/api/v1/musicians/get-musician-genres"
        urlDeleteGenres="http://localhost:3000/api/v1/musicians/"
      />

      <p className="update-musician-wrapper-p">AÑADIR MULTIMEDIA</p>

      <UploadMedia
        url="http://localhost:3000/api/v1/musicians/upload-media"
        profileMedia="musicianMedia"
        refreshMultimedia={refreshMultimedia}
      />

      <p className="update-musician-wrapper-p">MIS VÍDEOS</p>

      <ProfileMedia
        url="http://localhost:3000/api/v1/musicians/get-media-by-type"
        type="video"
        deleteUrl="http://localhost:3000/api/v1/musicians/delete-media"
        multimediaRoute="/musicians-media/user"
        mediaReloader={mediaReloader}
        refreshMultimedia={refreshMultimedia}
      />

      <p className="update-musician-wrapper-p">MIS AUDIOS</p>

      <ProfileMedia
        url="http://localhost:3000/api/v1/musicians/get-media-by-type"
        type="audio"
        deleteUrl="http://localhost:3000/api/v1/musicians/delete-media"
        multimediaRoute="/musicians-media/user"
        mediaReloader={mediaReloader}
        refreshMultimedia={refreshMultimedia}
      />

      <p className="update-musician-wrapper-p">MIS IMAGENES</p>

      <ProfileMedia
        url="http://localhost:3000/api/v1/musicians/get-media-by-type"
        type="imagen"
        deleteUrl="http://localhost:3000/api/v1/musicians/delete-media"
        multimediaRoute="/musicians-media/user"
        mediaReloader={mediaReloader}
        refreshMultimedia={refreshMultimedia}
      />

      <p className="update-musician-wrapper-p">CAMBIAR IMAGEN DE PORTADA</p>
      <div className="upload-avatar">
        <UploadCoverImage
          url="http://localhost:3000/api/v1/musicians/upload-media"
          profileMedia="musicianMedia"
        />
      </div>

      <div className="delete-musician">
        <ProfileDeleteAlert url="http://localhost:3000/api/v1/musicians/" />
      </div>
    </div>
  ) : (
    <CreateMusicians />
  );

  return jsxToReturn;
}

export default UpdateMusician;
