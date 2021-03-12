import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../App";
import jwt_decode from "jwt-decode";
import logOut from "./logOut";
import UserDeleteAlert from "./UserDeleteAlert";
import Avatar from "./Avatar";
import { UploadAvatar } from "./UploadAvatar";

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
        setUserName(userInfo.nombre_usuario);
        setName(userInfo.nombre);
        setSurname(userInfo.apellido);
        setEmail(userInfo.email);
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
    if (res.status === 201) {
      const resMessage = await res.json();
      setResponse(resMessage);
    } else {
      const resMessage = await res.json();

      setErrorMsg(resMessage.error);
    }
    refreshUserInfo();
  }

  return (
    <div>
      <div>
        <Avatar userInfoReloader={userInfoReloader} />
        <UploadAvatar />
      </div>
      <div className="login-wrapper">
        <form onSubmit={handleSubmit}>
          <label>
            <p>Nombre Usuario</p>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label>
            <p>Nombre</p>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <p>Apellido</p>
            <input
              type="text"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </label>
          <label>
            <p>Email</p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <div>
            {errorMsg && <div>{errorMsg}</div>}
            <button type="submit">Guardar cambios</button>
          </div>
          <UserDeleteAlert
            url="http://localhost:3000/api/v1/users/"
            logOut={logOut}
          />
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
