import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
// var nJwt = require("njwt");
import jwt_decode from "jwt-decode";

export function Avatar() {
  const [token, setToken] = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const decodedToken = jwt_decode(token);
  const { id_usuario } = decodedToken;

  useEffect(() => {
    const loadUserInfo = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${id_usuario}`
      );
      if (response.status === 200) {
        const body = await response.json();
        setUserInfo(body);
      }
    };
    loadUserInfo();
    console.log(userInfo);
  }, []);

  const jsxToReturn = userInfo.imagen_perfil ? (
    <div>
      {decodedToken.nombre_usuario}
      <img
        height="20px"
        src={`/users-media/${id_usuario}.${userInfo.imagen_perfil
          .split(".")
          .pop()}`}
      ></img>
    </div>
  ) : (
    <div>
      {decodedToken.nombre_usuario}
      <img height="20px" src={`/users-media/avatarDefault.png`}></img>
    </div>
  );

  return jsxToReturn;
}
export default Avatar;
