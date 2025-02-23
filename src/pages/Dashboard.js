import React, { useState, useEffect } from "react";
import { Heart, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import "../static/dashboard.css";
import Navbar from "./Navbar"; // Adjust path if needed
import "../static/navbar.css";

const Dashboard = () => {
  const [affirmation, setAffirmation] = useState([]);

  const fetchUserAffirmation = () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch(`http://localhost:3000/api/affirmation_by_user/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        setAffirmation(response.data);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchUserAffirmation();
  }, []);

  return (
    <>
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="dashboard-container">
        <h1 className="dashboard-title">Affirmations Dashboard</h1>

        <div className="table-container">
          <table className="affirmation-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Affirmation</th>
                <th>Category</th>
                <th>Date</th>
                <th>Favorite</th>
              </tr>
            </thead>
            <tbody>
              {affirmation.map((affirmations, index) => (
                <motion.tr
                  key={affirmations._id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <td>{index + 1}</td>
                  <td>{affirmations.affirmation}</td>
                  <td>{affirmations.category?.category || "N/A"}</td>
                  <td>
                    <span className="date-cell">
                      <Calendar size={16} className="icon" />
                      {new Date(affirmations.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    <button className="favorite-button">
                      <Heart
                        size={20}
                        className={`heart-icon ${
                          affirmations.isFavorite ? "favorite" : ""
                        }`}
                        fill={affirmations.isFavorite ? "#ef4444" : "none"}
                      />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
