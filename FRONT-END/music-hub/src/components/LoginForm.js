import React from "react";
import { useState, useEffect } from "react";

function LoginForm() {
  const [token, setToken] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/email/manuel981@yopmail.com"
      );
      if (response.status === 200) {
        const body = await response.json();
        setToken(body);
        console.log(token);
      }
    };
    loadUser();
  }, [token, setToken]);

  return (
    <div className="login-wrapper">
      <form>
        <label>
          <p>Email</p>
          <input type="email" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Envíar</button>
        </div>
      </form>

      <li key={token.id_usuario} className="list">
        <span className="repo-text">Token: {token.contrasena} </span>
      </li>
      <li key={token.id_usuario} className="list">
        <span className="repo-text">
          Nombre usuario: {token.nombre_usuario}
        </span>
      </li>
      <li key={token.id_usuario} className="list">
        <span className="repo-text">Nombre: {token.nombre} </span>
      </li>
      <li key={token.id_usuario} className="list">
        <span className="repo-text">Apellido: {token.apellido} </span>
      </li>
      <li key={token.id_usuario} className="list">
        <span className="repo-text">Rol de usuario: {token.rol} </span>
      </li>
    </div>
  );
}

export default LoginForm;
