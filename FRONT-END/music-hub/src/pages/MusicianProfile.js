import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function MusicanProfile() {
  const { musicianId } = useParams();
  console.log(musicianId);
  return (
    <div>
      <NavBar />
      <p>Hola</p>
      <Footer />
    </div>
  );
}

export default MusicanProfile;
