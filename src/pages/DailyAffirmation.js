import React, { useState, useEffect } from "react";
import Navbar from "./Navbar"; 
import "../static/dailyAffirmation.css";
import "../static/navbar.css";

import { Navigate } from "react-router-dom";

const DailyAffirmation = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [randomAffirmation, setRandomAffirmation] = useState("");
  const [isRandomAffirmationModalOpen, setIsRandomAffirmationModalOpen] =
    useState(false);
  const [isCreateAffirmationModalOpen, setIsCreateAffirmationModalOpen] =
    useState(false);
  const [affirmationText, setAffirmationText] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [affirmationSaved, setAffirmationSaved] = useState(false);
  const [userId, setUserId] = useState("");

  // Fetch user data
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
        setUserId(response.data._id);
      })
      .catch((error) => console.error("Error:", error));
  };

  // Fetch category data
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

  // Fetch a random affirmation
  const fetchRandomAffirmation = () => {
    if (!selectedCategory) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    fetch(`http://localhost:3000/api/random_affirmation/${selectedCategory}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        setRandomAffirmation(response.data);
        setIsRandomAffirmationModalOpen(true);
      })
      .catch((error) => console.error("Error:", error));
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedCat = category.find((cat) => cat.category === e.target.value);
    setSelectedCategory(e.target.value);
    setCategoryId(selectedCat ? selectedCat._id : ""); // Assign categoryId correctly
    setShowNotification(false);
  };

  // Open create affirmation modal
  const handleCreateAffirmationClick = () => {
    setIsCreateAffirmationModalOpen(true);
  };

  // Save new affirmation
  const handleSaveAffirmation = (event) => {
    event.preventDefault();

    if (!affirmationText || !categoryId) {
      alert("Please enter an affirmation and select a category.");
      return;
    }

    fetch("http://localhost:3000/api/affirmation/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userId,
        affirmation: affirmationText,
        category: categoryId, // Sending categoryId instead of category name
        isFavorite,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Response from server:", response);
        if (response.success) {
          setAffirmationSaved(true);
        }
      })
      .catch((error) => console.error("Error:", error));

    setIsCreateAffirmationModalOpen(false);
  };

  return (
    <>
    <Navbar />
    <div className="container">
      {affirmationSaved ? <Navigate to={`/dashboard/${userId}`} /> : null}
      <h1>Welcome {name}!</h1>
      <h3>Select a Category to Generate an Affirmation</h3>

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
        {category.map((cat) => (
          <option key={cat._id} value={cat.category}>
            {cat.category}
          </option>
        ))}
      </select>

      <button className="btn" onClick={fetchRandomAffirmation}>
        Generate Random Affirmation
      </button>
      <button className="btn" onClick={handleCreateAffirmationClick}>
        Create Affirmation
      </button>

      {/* Modal for Random Affirmation */}
      {isRandomAffirmationModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{randomAffirmation}</p>
            <button
              className="btn"
              onClick={() => setIsRandomAffirmationModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Creating Affirmation */}
      {isCreateAffirmationModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create a New Affirmation</h3>

            <textarea
              value={affirmationText}
              onChange={(e) => setAffirmationText(e.target.value)}
              placeholder="Enter your affirmation here..."
            />

            <label>Select Category</label>

            <select
              value={selectedCategory}
              onChange={(e) => {
                handleCategoryChange(e);
              }}
            >
              <option value="" disabled>
                Select Category
              </option>
              {category.map((cat) => (
                <option key={cat._id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>

            <label>
              <input
                type="checkbox"
                checked={isFavorite}
                onChange={() => setIsFavorite(!isFavorite)}
              />
              Mark as Favorite
            </label>

            <button className="btn" onClick={handleSaveAffirmation}>
              Save Affirmation
            </button>
            <button
              className="btn"
              onClick={() => setIsCreateAffirmationModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default DailyAffirmation;
