import React, { useState, useContext } from "react";
import { AuthContext } from "../App";

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
    if (res.status === 201) {
      const resMessage = await res.json();
      setResponse(resMessage);
    } else {
      const resMessage = await res.json();
      setErrorMsg(resMessage.error);
    }
  }
  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <label>
          <p>Contraseña actual</p>
          <input
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        <label>
          <p>Nueva contraseña</p>
          <input
            type="password"
            name="currentPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label>
          <p>Confirmar contraseña</p>
          <input
            type="password"
            name="currentPassword"
            value={repeatNewPassword}
            onChange={(e) => setRepeatNewPassword(e.target.value)}
          />
        </label>

        <div>
          {errorMsg && <div>{errorMsg}</div>}
          <button type="submit">Cambiar contraseña</button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePassword;
