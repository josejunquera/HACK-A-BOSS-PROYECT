import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import "./Avatar.css";

export function Avatar(props) {
  const [token, setToken] = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const decodedToken = jwt_decode(token);
  const { id_usuario } = decodedToken;
  const { userInfoReloader } = props;

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
  }, [userInfoReloader]);

  const jsxToReturn = userInfo.imagen_perfil ? (
    <Link id="avatar" to={"/profile/user-profile"}>
      <div>{userInfo.nombre_usuario}</div>
      <img
        height="30px"
        src={`/users-media/${id_usuario}.${userInfo.imagen_perfil
          .split(".")
          .pop()}`}
        alt="avatar"
      ></img>
    </Link>
  ) : (
    <Link id="avatar" to={"/profile/user-profile"}>
      <div>{userInfo.nombre_usuario}</div>{" "}
      <img
        height="30px"
        src={`/users-media/avatarDefault.png`}
        alt="avatar por defecto"
      ></img>
    </Link>
  );

  return jsxToReturn;
}
export default Avatar;
