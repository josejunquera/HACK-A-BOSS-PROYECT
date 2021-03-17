import React, { useState, useContext } from "react";
import { AuthContext } from "../App";
import "./UpdatePassword.css";

function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();

    const newPasswordServer = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      repeatNewPassword: repeatNewPassword,
    };

    const res = await fetch(
      "http://localhost:3000/api/v1/users/update-password",
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPasswordServer),
      }
    );
    if (res.status === 200 || res.status === 204) {
      const resMessage = await res.json();
      setResponse(resMessage.message);
    } else {
      const resMessage = await res.json();
      setResponse(resMessage.error);
    }
  }

  return (
    <div className="update-password-wrapper">
      <p className="update-password-wrapper-p">CAMBIAR CONTRASEÑA</p>

      <div className="update-password">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="update-password-input"
              type="password"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Contraseña actual"
            />
          </label>
          <label>
            <input
              className="update-password-input"
              type="password"
              name="currentPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nueva contraseña"
            />
          </label>
          <label>
            <input
              className="update-password-input"
              type="password"
              name="currentPassword"
              value={repeatNewPassword}
              onChange={(e) => setRepeatNewPassword(e.target.value)}
              placeholder="Confirmar contraseña"
            />
          </label>

          <div className="update-password-button">
            <button type="submit">Cambiar contraseña</button>
          </div>
        </form>
        <div className="response-message-musiciana">
          {response && <div>{response}</div>}
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
