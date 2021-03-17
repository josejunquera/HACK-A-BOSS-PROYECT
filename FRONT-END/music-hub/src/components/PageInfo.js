import React from "react";
import "./PageInfo.css";

function PageInfo() {
  return (
    <section className="info">
      <div className="sectionContent">
        <div>
          <h1>Encuentra actuaciones</h1>
          <p>
            <span className="red-text">
              ¿Quieres conseguir más actuaciones?
            </span>{" "}
            Muestrate a través de musicHub para encontrar actuaciones dónde
            quieras.
          </p>
        </div>
        <div>
          <h1>Encuentra bandas</h1>
          <p>
            <span className="red-text">
              ¿No tienes una banda con la que tocar?
            </span>{" "}
            Encuentra bandas a las que unirte y contacta con ellas a traves de
            musicHub.
          </p>
        </div>
        <div>
          <h1>Encuentra músicos</h1>
          <p>
            <span className="red-text">
              ¿Necesitas nuevos integrantes en tu banda?
            </span>{" "}
            Busca en musicHub, descubre y contacta con músicos solistas en tu
            zona.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PageInfo;
