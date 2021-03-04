import React, { useContext, useState } from "react";
import { AuthContext } from "../App";

export const UploadMedia = () => {
  const [file, setFile] = useState();
  const [filePicked, setFilePicked] = useState(false);
  const [token, setToken] = useContext(AuthContext);
  const [title, setTitle] = useState();
  // const { profileMedia, url } = props;

  function uploadFile() {
    let data = new FormData();
    data.append("musicianMedia", file);
    data.append("titulo", title);
    console.log(data);
    // console.log(url);
    // console.log(profileMedia);

    fetch("http://localhost:3000/api/v1/musicians/upload-media", {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((success) => {})
      .catch((error) => console.log(error));
  }
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setFilePicked(true);
  };

  return (
    <div className="App">
      <form onSubmit={uploadFile}>
        <div>
          <label>Nombre del archivo</label>
          <input
            type="text"
            name="location"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Select file to upload</label>
          <input type="file" onChange={onFileChange} />
        </div>
        <button type="submit">Subir archivo</button>
      </form>
    </div>
  );
};
