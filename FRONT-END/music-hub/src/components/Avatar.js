import React, { useContext } from "react";
import { AuthContext } from "../App";
// var nJwt = require("njwt");
import jwt_decode from "jwt-decode";

export function Avatar() {
  const [token, setToken] = useContext(AuthContext);

  var decodedToken = jwt_decode(token);

  return (
    <div>
      {decodedToken.nombre_usuario}
      <img src="/home/jose/Escritorio/HACK_A_BOSS_REPOSITORIOS/HACK-A-BOSS-PROYECT/FRONT-END/music-hub/public/1.png"></img>
    </div>
  );
}
export default Avatar;
