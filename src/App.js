import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DailyAffirmation from "./pages/DailyAffirmation";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/daily_affirmation/:id"
            element={<DailyAffirmation />}
          />
          <Route exact path="/dashboard/:id" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
