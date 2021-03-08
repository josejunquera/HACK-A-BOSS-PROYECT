import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

function Musicians() {
  const [musician, setMusician] = useState([]);
  const [urlCoverImage, setUrlCoverImage] = useState("");
  const [search, setSearch] = useState();
  const [form, setForm] = useState("");
  console.log(search);
  console.log(musician);

  useEffect(() => {
    const loadMusician = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/musicians/withgenres"
      );
      if (response.status === 200) {
        const body = await response.json();
        setMusician(body);
        // console.log(musician);
      }
    };
    loadMusician();
    // console.log(musician);
  }, [form]);

  useEffect(() => {
    const filterElements = (event) => {
      // event.preventDefault();
      // await setSearch(event.target.value);
      const filtered = musician.filter((elem) => {
        if (elem.nombre_solista.includes(search)) {
          return elem;
        }
      });
      setMusician(filtered);
      console.log(filtered);
    };
    filterElements();
  }, [search]);

  const onChange = (event) => {
    setSearch(event.target.value);
    // filterElements();
  };

  return (
    <>
      <NavBar />

      <form>
        <div>
          <label>Nombre del archivo</label>
          <input
            type="text"
            name="location"
            value={search}
            onChange={onChange}
          />
        </div>
        <div></div>
        <button type="submit">Buscar</button>
      </form>

      {musician.map((musiciann) => {
        const url = `http://localhost:3006/musicians-media/user${musiciann.id_usuario}/CoverImage.`;
        // console.log(url);

        const loadCoverImage = async () => {
          const response = await fetch(
            `http://localhost:3000/api/v1/musicians/get-cover-image/${musiciann.id_solista}`
          );
          if (response.status === 200) {
            const body = await response.json();

            // console.log(body);
            setUrlCoverImage(body.url);
            console.log(urlCoverImage);
            // loadCoverImage();
          }
          // else {
          //   setUrlCoverImage("");

          // }
        };
        // loadCoverImage();
        // const extension = urlCoverImage.split(".").pop();
        // console.log(extension);

        if (urlCoverImage !== "") {
          // console.log(urlCoverImage);
          return (
            <div
              style={{
                backgroundImage: `url(${url}${urlCoverImage.split(".").pop()})`,
                backgroundRepeat: "no-repeat",
                width: "250px",
              }}
            >
              <ul key={musiciann.id_solista} className="musicians-list">
                <li className="list">
                  <span className="repo-text">
                    Nombre solista: {musiciann.nombre_solista}{" "}
                  </span>
                </li>
                <li className="list">
                  <span className="repo-text">
                    Descripción: {musiciann.descripcion}{" "}
                  </span>
                </li>
                <li className="list">
                  <span className="repo-text">
                    Especialidad:{musiciann.especialidad}{" "}
                  </span>
                </li>
                <li className="list">
                  <span className="repo-text">
                    Movilidad: {musiciann.movilidad}{" "}
                  </span>
                </li>
                <li className="list">
                  {" "}
                  Géneros:
                  <span className="repo-text">
                    {musiciann.generos.map((genero) => {
                      return genero + " ";
                    })}
                  </span>
                </li>
              </ul>
            </div>
          );
        }
        if (urlCoverImage === "") {
          return (
            <div
              style={{
                backgroundImage: `url(http://localhost:3006/users-media/avatarDefault.png)`,
                backgroundRepeat: "no-repeat",
                width: "250px",
              }}
            >
              <ul key={musiciann.id_solista} className="musicians-list">
                <li className="list">
                  <span className="repo-text">
                    Nombre solista: {musiciann.nombre_solista}{" "}
                  </span>
                </li>
                <li className="list">
                  <span className="repo-text">
                    Descripción: {musiciann.descripcion}{" "}
                  </span>
                </li>
                <li className="list">
                  <span className="repo-text">
                    Especialidad:{musiciann.especialidad}{" "}
                  </span>
                </li>
                <li className="list">
                  <span className="repo-text">
                    Movilidad: {musiciann.movilidad}{" "}
                  </span>
                </li>
                <li className="list">
                  {" "}
                  Géneros:
                  <span className="repo-text">
                    {musiciann.generos.map((genero) => {
                      return genero + " ";
                    })}
                  </span>
                </li>
              </ul>
            </div>
          );
        }
      })}
    </>
  );
}

export default Musicians;
