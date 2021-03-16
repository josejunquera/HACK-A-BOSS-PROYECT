import React, { useContext, useState } from "react";
import { AuthContext } from "../App";
import "./UploadCoverImage.css";

export const UploadCoverImage = (props) => {
  const [file, setFile] = useState();
  const [filePicked, setFilePicked] = useState(false);
  const [token, setToken] = useContext(AuthContext);
  const { profileMedia, url } = props;
  const [response, setResponse] = useState("");

  function uploadFile(event) {
    event.preventDefault();
    let data = new FormData();
    data.append(profileMedia, file);
    data.append("titulo", "CoverImage");

    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())

      .then((success) => {
        setResponse("Imagen de portada actualizada");
      })
      .catch((error) => console.log(error));
  }

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setFilePicked(true);
  };

  return (
    <div className="App">
      <form className="upload-avatar-container" onSubmit={uploadFile}>
        <div className="upload-avatar-label">
          <label></label>
          <div className="input-personalizado">
            <label className="texto">Seleccionar archivo</label>
            <input type="file" onChange={onFileChange} />
          </div>
        </div>
        <button id="boton" type="submit">
          Subir archivo
        </button>
        <div className="response-message-musician">{response}</div>
      </form>
    </div>
  );
};
