import React, { useContext, useState } from "react";
import { AuthContext } from "../App";

export const UploadAvatar = () => {
  const [file, setFile] = useState();
  const [token, setToken] = useContext(AuthContext);

  function uploadFile() {
    let data = new FormData();
    console.log(data);
    // data.append("userid", 1231);
    // data.append("profileImage", file);
    fetch("http://localhost:3000/api/v1/users/upload-profile-image", {
      method: "POST",
      body: {
        profileImage:
          "/home/13achk/Pictures/Screenshot from 2020-12-19 15-47-56.png",
      },
      headers: {
        // "Content-type": "form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((success) => {
        // Do something with the successful response
      })
      .catch((error) => console.log(error));
  }
  const onFileChange = (event) => {
    const f = event.target.files[0];
    setFile(f);
    // console.log(f);
    // console.log(event);
    console.log(file);
  };

  return (
    <div className="App">
      <form onSubmit={uploadFile}>
        <div>
          <label>Select file to upload</label>
          <input type="file" onChange={onFileChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};
