import React, { useState } from "react";
import Students from "../components/Students";
import Courses from "../components/Courses";
import "./App.css";

export default function App() {
  const [view, setView] = useState("Students");

  return (
    <div style={{ padding: 20 }} className="app-container">
      <h1>Student Records</h1>
      <nav className="nav-buttons">
        <button
          onClick={() => setView("Students")}
          disabled={view === "Students"}
        >
          Students
        </button>
        <button
          onClick={() => setView("Courses")}
          disabled={view === "Courses"}
        >
          Courses
        </button>
      </nav>
      <hr />
      {view === "Students" ? <Students /> : <Courses />}
    </div>
  );
}
