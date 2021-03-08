import React, { useContext, useState } from "react";
import { AuthContext } from "../App";

export const UploadCoverImage = (props) => {
  const [file, setFile] = useState();
  const [filePicked, setFilePicked] = useState(false);
  const [token, setToken] = useContext(AuthContext);
  const { profileMedia, url } = props;

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
          <label>Cover Image</label>
          <input type="file" onChange={onFileChange} />
        </div>
        <button type="submit">Subir archivo</button>
      </form>
    </div>
  );
};
