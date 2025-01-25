import React, { useState, useEffect } from "react";
import "../static/dailyAffirmation.css";

const DailyAffirmation = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [randomAffirmation, setRandomAffirmation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [newAffirmation, setNewAffirmation] = useState(""); // Text input for new affirmation
  const [isFavorite, setIsFavorite] = useState(false); // Track if affirmation is marked as favorite

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
        setIsModalOpen(true); // Open modal after fetching affirmation
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setShowNotification(false);
  };

  const handleSaveAffirmation = () => {
    // Logic to save the new affirmation (post request or any other method)
    console.log("Saving affirmation:", newAffirmation);
    console.log("Is Favorite:", isFavorite);
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1>Welcome {name}!</h1>
      <h2>Please Select a Category...</h2>

      {showNotification && (
        <div className="notification show">
          Please select a category.
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
        Create Affirmation
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Random Affirmation:</h3>
            <p>{randomAffirmation}</p>

            <h4>Create a New Affirmation</h4>
            <textarea
              placeholder="Write your affirmation here"
              value={newAffirmation}
              onChange={(e) => setNewAffirmation(e.target.value)}
              rows="4"
              style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
            />

            <div>
              <label>
                Mark as Favorite:
                <select
                  onChange={(e) => setIsFavorite(e.target.value === "true")}
                  value={isFavorite ? "true" : "false"}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </label>
            </div>

            <button className="btn" onClick={handleSaveAffirmation}>
              Save Affirmation
            </button>
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
