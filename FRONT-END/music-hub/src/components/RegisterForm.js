import React from "react";
import { useState, useEffect } from "react";

function RegisterForm() {
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
          <p>Nombre Usuario</p>
          <input type="text" />
        </label>
        <label>
          <p>Nombre</p>
          <input type="text" />
        </label>
        <label>
          <p>Apellido</p>
          <input type="text" />
        </label>
        <label>
          <p>Email</p>
          <input type="email" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <label>
          <p>Repeat Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Envíar</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
