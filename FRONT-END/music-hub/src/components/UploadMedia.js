import React, { useContext, useState } from "react";
import { AuthContext } from "../App";

export const UploadMedia = (props) => {
  const [file, setFile] = useState();
  const [filePicked, setFilePicked] = useState(false);
  const [token, setToken] = useContext(AuthContext);
  const [title, setTitle] = useState();
  const { profileMedia, url } = props;

  function uploadFile() {
    let data = new FormData();
    data.append(profileMedia, file);
    data.append("titulo", title);
    console.log(data);

    fetch(url, {
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
