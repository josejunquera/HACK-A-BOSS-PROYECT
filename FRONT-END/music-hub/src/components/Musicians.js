import React from "react";
import { useState, useEffect } from "react";

function Musicians() {
  const [people, setPeople] = useState([]);
  const loadPeople = async () => {
    const response = await fetch("http://localhost:3000/api/v1/musicians", {
      mode: "no-cors",
    });
    if (response.status === 200) {
      const body = await response.json();
      setPeople(body);
      console.log(people);
    }
  };
  loadPeople();
  return <div>{people[0]}</div>;
}

export default Musicians;
