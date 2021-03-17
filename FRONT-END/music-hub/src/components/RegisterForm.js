import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import "./RegisterForm.css";

function RegisterForm() {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

    const res = await fetch("http://localhost:3000/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(nuevoUsuarioServidor),
    });
    if (res.status === 201) {
      const resMessage = await res.json();

      setResponse(resMessage);
      window.location = "http://localhost:3006/login";
    } else {
      const resMessage = await res.json();

      setErrorMsg(resMessage.error);
    }
  }
  return (
    <div className="register-wrapper">
      <div className="register">
        <Link to="/">
          <img src="./assets/logo_pequeño.png" alt="logo" />
        </Link>

        <p>Registro</p>

        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="register-form-input"
              type="text"
              name="userName"
              placeholder="Nombre Usuario"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label>
            <input
              className="register-form-input"
              type="text"
              name="name"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <input
              className="register-form-input"
              type="text"
              name="surname"
              placeholder="Apellido"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </label>
          <label>
            <input
              className="register-form-input"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <input
              className="register-form-input"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <input
              className="register-form-input"
              type="password"
              name="password"
              placeholder="Repetir Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </label>

          <div className="register-form-button">
            <button type="submit">Enviar</button>
          </div>
          <div className="response-message-musician">
            {errorMsg && <div>{errorMsg}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
