import React, { useState, useEffect } from "react";
import "../static/dailyAffirmation.css";

const DailyAffirmation = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");

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






//-----this function needs to pass the Id of the category selected


  const fetchRandomAffirmation = () => {
    fetch("http://localhost:3000/api/random_affirmation/", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error("Error:", error));
  };










  const handleCategoryChange = (e) => {
    const selectedCat = category.find((cat) => cat.category === e.target.value);
    setSelectedCategory(selectedCat.category);
    setCategoryId(selectedCat._id);
    console.log(categoryId);
  };

  return (
    <div className="container">
      <h1>Welcome {name}!</h1>
      <p className="affirmation"></p>
      <button className="btn" onClick={fetchRandomAffirmation}>
        Generate New Affirmation
      </button>

      <select
        className="dropdown"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Select Category</option>
        {category.map((cat, index) => (
          <option key={index} value={cat.category}>
            {cat.category}
          </option>
        ))}
      </select>
      <button
        className="btn"
        onClick={() => (window.location.href = "/create-affirmation")}
      >
        Create Affirmation
      </button>
    </div>
  );
};

export default DailyAffirmation;
