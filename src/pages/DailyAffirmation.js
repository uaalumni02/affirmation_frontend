import React, { useState, useEffect } from "react";

const DailyAffirmation = () => {
  const [name, setName] = useState("");

  const fetchUserData = () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch("http://localhost:3000/api/user/" + id, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        setName(response.data.userName);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Welcome {name}!</h1>

      {/* <button onClick={generateRandomAffirmation}>
        Generate New Affirmation
      </button> */}
    </div>
  );
};

export default DailyAffirmation;
