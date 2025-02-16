import React from "react";
import { Heart, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import "../static/dashboard.css"; // Import external CSS

const affirmations = [
  {
    id: 1,
    text: "I am capable and strong.",
    category: "Motivation",
    favorite: true,
    createdAt: "2025-02-16",
  },
  {
    id: 2,
    text: "I deserve happiness and success.",
    category: "Self-Love",
    favorite: false,
    createdAt: "2025-02-14",
  },
  {
    id: 3,
    text: "I am enough just as I am.",
    category: "Self-Worth",
    favorite: true,
    createdAt: "2025-02-10",
  },
  {
    id: 4,
    text: "Challenges help me grow and improve.",
    category: "Growth",
    favorite: false,
    createdAt: "2025-02-08",
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Affirmations Dashboard</h1>

      <div className="table-container">
        <table className="affirmation-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Affirmation</th>
              <th>Category</th>
              <th>Date</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {affirmations.map((affirmation) => (
              <motion.tr
                key={affirmation.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <td>{affirmation.id}</td>
                <td>{affirmation.text}</td>
                <td>{affirmation.category}</td>
                <td>
                  <span className="date-cell">
                    <Calendar size={16} className="icon" />
                    {affirmation.createdAt}
                  </span>
                </td>
                <td>
                  <button className="favorite-button">
                    <Heart
                      size={20}
                      className={`heart-icon ${
                        affirmation.favorite ? "favorite" : ""
                      }`}
                      fill={affirmation.favorite ? "#ef4444" : "none"}
                    />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
