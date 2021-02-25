import React from "react";
// import musicianSVG from "../../public/info_svgs/";

function PageInfo() {
  return (
    <section className="info">
      <div className="sectionTitle">
        <h1>¿Qué puedes hacer en musicHub?</h1>
      </div>
      <div className="sectionContent">
        <div>
          {/* <img src="../../public/info_svgs/band.svg" alt="band"></img> */}
          <p>Músicos y bandas que buscan actuaciones</p>
        </div>
        <div>
          <p>Bandas que buscan músicos</p>
        </div>
        <div>
          <p>Músicos que buscan banda</p>
        </div>
      </div>
    </section>
  );
}

export default PageInfo;
