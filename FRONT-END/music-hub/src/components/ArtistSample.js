import React from "react";
import "./ArtistSample.css";

function ArtistSample() {
  return (
    <div className="Slide">
      <a id="0" href="#0">
        0
      </a>
      <div>
        <div>
          <h2 screen="five">Nikolai Jrushchov</h2>
          <h3>Guitarrista</h3>
          <p>Barcelona, España</p>
        </div>
      </div>
      <a id="1" href="#1">
        1
      </a>
      <div>
        <div>
          <h2 screen="five">Ramón de Pitis </h2>
          <h3>Bajista</h3>
          <p>Badajoz, Spain</p>
        </div>
      </div>
      <a id="2" href="#2">
        2
      </a>
      <div>
        <div>
          <h2 screen="five">Martina Ferreiro</h2>
          <h3>Guitarrista</h3>
          <p>A Coruña, España</p>
        </div>
      </div>
    </div>
  );
}

export default ArtistSample;
