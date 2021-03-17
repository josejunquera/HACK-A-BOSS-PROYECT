import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../App";
import jwt_decode from "jwt-decode";
import logOut from "./logOut";
import UserDeleteAlert from "./UserDeleteAlert";
import Avatar from "./Avatar";
import { UploadAvatar } from "./UploadAvatar";
import "./UpdateUser.css";

function UpdateUser() {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const decodedToken = jwt_decode(token);
  const { id_usuario } = decodedToken;
  const [formState, setFormState] = useState("");

  const [userInfoReloader, setUserInfoReloader] = useState(1);
  const refreshUserInfo = () => setUserInfoReloader(Math.random());

  useEffect(() => {
    const loadUserInfo = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${id_usuario}`
      );
      if (response.status === 200) {
        const body = await response.json();
        setUserInfo(body);
        setUserName(body.nombre_usuario);
        setName(body.nombre);
        setSurname(body.apellido);
        setEmail(body.email);
        setFormState("activo");
      }
    };
    loadUserInfo();
  }, [formState]);

  async function handleSubmit(event) {
    event.preventDefault();

    const nuevoUsuarioServidor = {
      nombreUsuario: userName,
      nombre: name,
      apellido: surname,
      email: email,
    };

    const res = await fetch("http://localhost:3000/api/v1/users/", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nuevoUsuarioServidor),
    });
    if (res.status === 200) {
      const resMessage = await res.json();
      setResponse("Usuario actualizado");
    } else {
      const resMessage = await res.json();

      setResponse(resMessage.error);
    }
    refreshUserInfo();
  }
  return (
    <div className="updateuser-container">
      <div className="update-user-wrapper">
        <Avatar id="avatar-profile" userInfoReloader={userInfoReloader} />
        <p className="update-user-wrapper-p">EDITAR USUARIO</p>

        <div className="update-user">
          <form onSubmit={handleSubmit}>
            <label>
              <p>Nombre Usuario</p>
              <input
                className="update-user-input"
                type="text"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <label>
              <p>Nombre</p>
              <input
                className="update-user-input"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <p>Apellido</p>
              <input
                className="update-user-input"
                type="text"
                name="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </label>
            <label>
              <p>Email</p>
              <input
                className="update-user-input"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <div className="update-user-button">
              <button type="submit">Guardar cambios</button>
            </div>
          </form>
          <div className="response-message-musician">
            {response && <div>{response}</div>}
          </div>
        </div>
      </div>
      <div className="upload-avatar-wrapper">
        <div className="upload-avatar">
          <UploadAvatar />
        </div>
      </div>
      <div className="delete-user">
        <UserDeleteAlert
          url="http://localhost:3000/api/v1/users/"
          logOut={logOut}
        />
      </div>
    </div>
  );
}

export default UpdateUser;
