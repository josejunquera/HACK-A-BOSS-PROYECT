import React from "react";
import { useState, useEffect } from "react";

function LoginForm() {
  const [token, setToken] = useState();

  useEffect(() => {
    const loadUser = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/email/javier981@yopmail.com"
      );
      if (response.status === 200) {
        const body = await response.json();
        setToken(body);
      }
    };
    loadUser();
    console.log(token);
  }, []);

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

      <li key={token.usuario} className="list">
        <span className="repo-text">{token.contrasena} </span>
        <span className="repo-text">{token.nombre_usuario} </span>
      </li>
    </div>
  );
}

export default LoginForm;
