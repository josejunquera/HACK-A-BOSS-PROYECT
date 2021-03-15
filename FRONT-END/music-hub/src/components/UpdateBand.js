import React, { useState, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../App";
import CreateBand from "./CreateBand";
import ProfileMedia from "./ProfileMedia";
import ProfileDeleteAlert from "./ProfileDeleteAlert";
import { UploadMedia } from "./UploadMedia";
import Genres from "./Genres";
import { UploadCoverImage } from "./UploadCoverImage";
import "./UpdateBand.css"

function UpdateBand() {
  const [bandName, setBandName] = useState("");
  const [location, setLocation] = useState("");
  const [movility, setMovility] = useState("local");
  const [lookingForMusician, setLookingForMusician] = useState("si");
  const [lookingForGig, setLookingForGig] = useState("si");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);
  const [bandInfo, setBandInfo] = useState("");
  const decodedToken = jwt_decode(token);
  const { id_usuario } = decodedToken;
  const [formState, setFormState] = useState("");
  const [mediaReloader, setMediaReloader] = useState(1);
  const refreshMultimedia = () => setMediaReloader(Math.random());

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

        setBandName(body.nombre_banda);
        setLocation(body.localizacion);
        setMovility(body.movilidad);
        setLookingForMusician(body.busco_solista);
        setLookingForGig(body.busco_actuacion);
        setDescription(body.descripcion);
        setFormState("activo");
      }
    };
    loadBandInfo();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const newBandServer = {
      nombreBanda: bandName,
      localizacion: location,
      movilidad: movility,
      buscoSolista: lookingForMusician,
      buscoActuacion: lookingForGig,
      descripcion: description,
    };

    const res = await fetch("http://localhost:3000/api/v1/bands/", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBandServer),
    });
    if (res.status === 201) {
      const resMessage = await res.json();
      setResponse(resMessage);
    } else {
      const resMessage = await res.json();
      setErrorMsg(resMessage.error);
    }
  }

  const jsxToReturn = bandInfo ? (
    <div className="update-band-wrapper">
      <p className="update-band-wrapper-p">EDITAR PERFIL DE BANDA</p>

      <div className="update-band">
        <form onSubmit={handleSubmit}>
          <label>
            <p>Nombre Banda</p>
            <input
              type="text"
              name="bandName"
              value={bandName}
              onChange={(e) => setBandName(e.target.value)}
              className="update-band-form-input"
            />
          </label>
          <label>
            <p>localizacion</p>
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="update-band-form-input"
            />
          </label>
          <label>
            <p>Movilidad</p>
            <select
              id="movility"
              name="movility"
              onChange={(e) => setMovility(e.target.value)}
              className="update-band-form-input"
            >
              <option value={bandInfo.movilidad}>
                Actual: {bandInfo.movilidad}
              </option>
              <option value="local">Local</option>
              <option value="provincial">Provincial</option>
              <option value="nacional">Nacional</option>
              <option value="internacional">Internacional</option>
            </select>
          </label>
          <label>
            <p>Busco Músico</p>
            <select
              id="lookingForMusician"
              name="lookingForMusician"
              onChange={(e) => setLookingForMusician(e.target.value)}
              className="update-band-form-input"
            >
              <option value={bandInfo.busco_solista}>
                Actual: {bandInfo.busco_solista}
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
              className="update-band-form-input"
            >
              <option value={bandInfo.busco_actuacion}>
                Actual: {bandInfo.busco_actuacion}
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
                className="update-band-form-input"
              />
            </label>
            {errorMsg && <div>{errorMsg}</div>}
          </div>
          <div>
            <div className="update-band-button">
              <button type="submit">Guardar cambios</button>
            </div>
          </div>
        </form>
      </div>

      <p className="update-musician-wrapper-p">EDITAR GÉNEROS</p>

      <Genres
        url="http://localhost:3000/api/v1/bands/addgenre/"
        urlGetGenres="http://localhost:3000/api/v1/bands/get-band-genres"
        urlDeleteGenres="http://localhost:3000/api/v1/bands/"
      />
      <p className="update-musician-wrapper-p">AÑADIR MULTIMEDIA</p>

      <UploadMedia
        url="http://localhost:3000/api/v1/bands/upload-media/"
        profileMedia="bandMedia"
        refreshMultimedia={refreshMultimedia}
      />
      <p className="update-musician-wrapper-p">MIS VÍDEOS</p>

      <ProfileMedia
        url="http://localhost:3000/api/v1/bands/get-media-by-type"
        type="video"
        deleteUrl="http://localhost:3000/api/v1/bands/delete-media"
        multimediaRoute="/band-media/user"
        mediaReloader={mediaReloader}
        refreshMultimedia={refreshMultimedia}
      />
      <p className="update-musician-wrapper-p">MIS AUDIOS</p>

      <ProfileMedia
        url="http://localhost:3000/api/v1/bands/get-media-by-type"
        type="audio"
        deleteUrl="http://localhost:3000/api/v1/bands/delete-media"
        multimediaRoute="/band-media/user"
        mediaReloader={mediaReloader}
        refreshMultimedia={refreshMultimedia}
      />
      <p className="update-musician-wrapper-p">MIS IMAGENES</p>

      <ProfileMedia
        url="http://localhost:3000/api/v1/bands/get-media-by-type"
        type="imagen"
        deleteUrl="http://localhost:3000/api/v1/bands/delete-media"
        multimediaRoute="/band-media/user"
        mediaReloader={mediaReloader}
        refreshMultimedia={refreshMultimedia}
      />
      <p className="update-musician-wrapper-p">CAMBIAR IMAGEN DE PORTADA</p>
      <div className="upload-avatar">
        <UploadCoverImage
          url="http://localhost:3000/api/v1/bands/upload-media/"
          profileMedia="bandMedia"
        />
      </div>
      <div className="delete-band">
        <ProfileDeleteAlert url="http://localhost:3000/api/v1/bands/" />
      </div>
    </div>
  ) : (
    <CreateBand />
  );
  return jsxToReturn;
}

export default UpdateBand;
