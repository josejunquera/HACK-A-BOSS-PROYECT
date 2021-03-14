import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../App";
import jwt_decode from "jwt-decode";
import "./ProfileMedia.css"

function ProfileMediaImage(props) {
  const [multimedia, setMultimedia] = useState([]);
  const [token, setToken] = useContext(AuthContext);
  const decodedToken = jwt_decode(token);
  const { id_usuario } = decodedToken;
  const {
    url,
    deleteUrl,
    type,
    multimediaRoute,
    mediaReloader,
    refreshMultimedia,
  } = props;

  useEffect(() => {
    const loadMusician = async () => {
      const response = await fetch(`${url}/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const body = await response.json();

        setMultimedia(body);
      }
    };
    loadMusician();
  }, [token, type, url, mediaReloader]);

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
      <div className="multimedia-wrapper">
        {multimedia.map((media) => {
          return (
            <>
              <ul key={media.id_multimedia} >
                <li >
                  <span >{media.titulo} </span>
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
                  refreshMultimedia();
                }}
              >
                Borrar
              </button>
            </>
          );
        })}
      </div>
    );
  }
  if (type === "video") {
    return (
      <div className="multimedia-wrapper">
        {multimedia.map((media) => {
          return (
            <>
              <ul key={media.id_multimedia}>
                <li >
                  <span >{media.titulo} </span>
                </li>
                <li >
                  <video
                    controls
                    height="100px"
                    src={`${multimediaRoute}${id_usuario}/${
                      media.titulo
                    }.${media.url.split(".").pop()}`}
                    alt="avatar"
                  ></video>
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
                  refreshMultimedia();
                }}
              >
                Borrar
              </button>
            </>
          );
        })}
      </div>
    );
  }
  if (type === "audio") {
    return (
      <div className="multimedia-wrapper">
        {multimedia.map((media) => {
          return (
            <>
              <ul key={media.id_multimedia} >
                <li >
                  <span >{media.titulo} </span>
                </li>
                <li >
                  <audio
                    controls
                    src={`${multimediaRoute}${id_usuario}/${
                      media.titulo
                    }.${media.url.split(".").pop()}`}
                    alt="avatar"
                  ></audio>
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
                  refreshMultimedia();
                }}
              >
                Borrar
              </button>
            </>
          );
        })}
      </div>
    );
  }
}

export default ProfileMediaImage;
