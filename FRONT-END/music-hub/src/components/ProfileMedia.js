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
  const { url, deleteUrl, type, multimediaRoute } = props;

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
  }, [form, multimedia]);

  // async function deleteMedia() {
  //   await fetch(`${deleteUrl}/${id_multimedia}`, {
  //     method: "DELETE",
  //     headers: {
  //       // "Content-type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }

  if (type === "imagen") {
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
                    src={`${multimediaRoute}${id_usuario}/${
                      media.titulo
                    }.${media.url.split(".").pop()}`}
                    alt="avatar"
                  ></img>
                </li>
                <li className="list">
                  <span className="repo-text">Titulo: {media.titulo} </span>
                </li>
              </ul>
              <button
                type="button"
                onClick={async function deleteMedia() {
                  await fetch(`${deleteUrl}/${media.id_multimedia}`, {
                    method: "DELETE",
                    headers: {
                      // "Content-type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  });
                }}
              >
                Borrar archivo
              </button>
            </>
          );
        })}
      </>
    );
  }
  if (type === "video") {
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
                  <video
                    controls
                    height="100px"
                    src={`${multimediaRoute}${id_usuario}/${
                      media.titulo
                    }.${media.url.split(".").pop()}`}
                    alt="avatar"
                  ></video>
                </li>
                <li className="list">
                  <span className="repo-text">Titulo: {media.titulo} </span>
                </li>
              </ul>
              <button
                type="button"
                onClick={async function deleteMedia() {
                  await fetch(`${deleteUrl}/${media.id_multimedia}`, {
                    method: "DELETE",
                    headers: {
                      // "Content-type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  });
                }}
              >
                Borrar archivo
              </button>
            </>
          );
        })}
      </>
    );
  } else {
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
                  <audio
                    controls
                    src={`${multimediaRoute}${id_usuario}/${
                      media.titulo
                    }.${media.url.split(".").pop()}`}
                    alt="avatar"
                  ></audio>
                </li>
                <li className="list">
                  <span className="repo-text">Titulo: {media.titulo} </span>
                </li>
              </ul>
              <button
                type="button"
                onClick={async function deleteMedia() {
                  await fetch(`${deleteUrl}/${media.id_multimedia}`, {
                    method: "DELETE",
                    headers: {
                      // "Content-type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  });
                }}
              >
                Borrar archivo
              </button>
            </>
          );
        })}
      </>
    );
  }
}

export default ProfileMediaImage;
