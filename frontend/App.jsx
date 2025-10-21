import React from "react";
import StudentList from "./components/Students";
import CourseList from "./components/Courses";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Student & Course Manager</h1>
      <StudentList />
      <hr />
      <CourseList />
    </div>
  );
}

export default App;
