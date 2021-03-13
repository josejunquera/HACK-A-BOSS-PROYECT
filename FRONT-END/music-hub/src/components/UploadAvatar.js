import React, { useContext, useState } from "react";
import { AuthContext } from "../App";
import "./UploadAvatar.css"

export const UploadAvatar = () => {
  const [file, setFile] = useState();
  const [filePicked, setFilePicked] = useState(false);
  const [token, setToken] = useContext(AuthContext);

  function uploadFile() {
    let data = new FormData();
    console.log(data);
    data.append("profileImage", file);
    fetch("http://localhost:3000/api/v1/users/upload-profile-image", {
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
      <form className="upload-avatar-container" onSubmit={uploadFile}>
        <div className="upload-avatar-label">
          <label>Editar foto de avatar</label>
          <input type="file" onChange={onFileChange} />
        </div>
        <button type="submit">Cambiar imagen</button>
      </form>
    </div>
  );
};
