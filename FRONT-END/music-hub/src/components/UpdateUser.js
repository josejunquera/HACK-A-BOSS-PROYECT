import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../App";

function UpdateUser() {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();

    const nuevoUsuarioServidor = {
      nombreUsuario: userName,
      nombre: name,
      apellido: surname,
      email: email,
      password: password,
      repeatPassword: repeatPassword,
    };

    const res = await fetch("http://localhost:3000/api/v1/users/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nuevoUsuarioServidor),
    });
    if (res.status === 201) {
      const resMessage = await res.json();
      // const nuevaListaUsuarios = [resMessage];
      setResponse(resMessage);
      // setUserName("");
      // setName("");
      // setSurname("");
      // setEmail("");
      // setPassword("");
      // setRepeatPassword("");
      // setErrorMsg("");
    } else {
      const resMessage = await res.json();
      // const nuevaListaUsuarios = [resMessage];
      // setResponse(resMessage);
      setErrorMsg(resMessage.error);
    }
  }
  return (
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
        <label>
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <p>Repeat Password</p>
          <input
            type="password"
            name="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </label>
        <div>
          {errorMsg && <div>{errorMsg}</div>}
          <button type="submit">Envíar</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
