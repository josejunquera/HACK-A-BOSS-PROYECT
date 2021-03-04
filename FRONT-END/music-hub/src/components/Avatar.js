import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";

import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

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
  }, []);

  const jsxToReturn = userInfo.imagen_perfil ? (
    <div>
      {decodedToken.nombre_usuario}
      <Link to={"/profile/user-profile"}>
        <img
          height="20px"
          src={`/users-media/${id_usuario}.${userInfo.imagen_perfil
            .split(".")
            .pop()}`}
          alt="avatar"
        ></img>
      </Link>
    </div>
  ) : (
    <div>
      {decodedToken.nombre_usuario}
      <Link to={"/profile/user-profile"}>
        <img
          height="20px"
          src={`/users-media/avatarDefault.png`}
          alt="avatar por defecto"
        ></img>
      </Link>
    </div>
  );

  return jsxToReturn;
}
export default Avatar;
