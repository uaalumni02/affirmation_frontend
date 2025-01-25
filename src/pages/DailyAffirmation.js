import React, { useState, useEffect } from "react";
import "../static/dailyAffirmation.css";

const DailyAffirmation = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [randomAffirmation, setRandomAffirmation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const fetchUserData = () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch(`http://localhost:3000/api/user/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        setName(response.data.userName);
      })
      .catch((error) => console.error("Error:", error));
  };

  const fetchCategoryData = () => {
    fetch("http://localhost:3000/api/category/", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchUserData();
    fetchCategoryData();
  }, []);

  const fetchRandomAffirmation = () => {
    if (selectedCategory === "") {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); // Hide after 3 seconds
      return;
    }

    fetch(`http://localhost:3000/api/random_affirmation/${selectedCategory}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        setRandomAffirmation(response.data);
        setIsModalOpen(true);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setShowNotification(false);
  };

  return (
    <div className="container">
      <h1>Welcome {name}!</h1>

      {showNotification && (
        <div className="notification show">
          Please select a category before generating an affirmation.
        </div>
      )}

      <select
        className="dropdown"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="" disabled>
          Select Category
        </option>
        {category.map((cat, index) => (
          <option key={index} value={cat.category}>
            {cat.category}
          </option>
        ))}
      </select>

      <button className="btn" onClick={fetchRandomAffirmation}>
        Generate Random Affirmation
      </button>
      <button
        className="btn"
        onClick={() => (window.location.href = "/create-affirmation")}
      >
        Create Affirmation
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{randomAffirmation}</p>
            <button className="btn" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyAffirmation;
