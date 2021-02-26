import React from "react";
import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useLocalStorage("token", "");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const nuevoUsuarioServidor = {
      email: email,
      password: password,
    };

    const res = await fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nuevoUsuarioServidor),
    });
    if (res.status === 200) {
      const resMessage = await res.json();
      setToken(resMessage.accessToken);

      // setEmail("");
      // setPassword("");
    } else {
      const resMessage = await res.json();
      // const nuevaListaUsuarios = [resMessage];
      // setResponse(resMessage);
      setErrorMsg(resMessage.error);
      console.log(errorMsg);
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
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
        <div>
          <button type="submit">Envíar</button>
        </div>
        {errorMsg && <div>{errorMsg}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
