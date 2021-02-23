import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

function Musicians() {
  const [musician, setMusician] = useState([]);

  useEffect(() => {
    const loadMusician = async () => {
      const response = await fetch(
        "https://api.github.com/users/hacktivist123/repos"
      );
      if (response.status === 200) {
        const body = await response.json();
        setMusician(body);
      }
    };
    loadMusician();
    console.log(musician);
  });

  return (
    <>
      <NavBar />
      <ul>
        {musician.map((repo) => {
          return (
            <li key={repo.id} className="list">
              <span className="repo-text">{repo.name} </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Musicians;
