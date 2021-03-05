import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../App";
import jwt_decode from "jwt-decode";

function ProfileMediaImage(props) {
  const [multimedia, setMultimedia] = useState([]);
  const [token, setToken] = useContext(AuthContext);
  const [form, setForm] = useState(false);
  const decodedToken = jwt_decode(token);
  const { id_usuario } = decodedToken;
  const { url, type, ta } = props;

  useEffect(() => {
    const loadMusician = async () => {
      const response = await fetch(`${url}/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const body = await response.json();
        setForm(true);
        setMultimedia(body);
      }
    };
    loadMusician();
  }, [form]);

  return (
    <>
      {multimedia.map((media) => {
        return (
          <>
            <ul key={media.id_multimedia} className="musicians-list">
              <li className="list">
                <span className="repo-text">
                  Id multimedia: {media.id_multimedia}{" "}
                </span>
              </li>
              <li className="list">
                <span className="repo-text">Tipo: {media.tipo} </span>
              </li>
              <li className="list">
                <img
                  height="100px"
                  src={`/musicians-media/user${id_usuario}/${
                    media.titulo
                  }.${media.url.split(".").pop()}`}
                  alt="avatar"
                ></img>
              </li>
              <li className="list">
                <span className="repo-text">Titulo: {media.titulo} </span>
              </li>
            </ul>
          </>
        );
      })}
    </>
  );
}

export default ProfileMediaImage;
