import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function MusicanProfile() {
  const { userId } = useParams();
  console.log(userId);
  return (
    <div>
      <NavBar />
      <p>Hola soy musico</p>
      <Footer />
    </div>
  );
}

export default MusicanProfile;
