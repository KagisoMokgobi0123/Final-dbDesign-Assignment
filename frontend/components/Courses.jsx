import React, { useEffect, useState } from "react";

const COURSES_API = "http://localhost:5000/courses";
const STUDENTS_API = "http://localhost:5000/students";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    studentName: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch(COURSES_API);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      alert("Error fetching courses");
    }
    setLoading(false);
  };

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await fetch(STUDENTS_API);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      alert("Error fetching students");
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchStudents();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new course
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.studentName)
      return alert("Fill all fields");

    // Find student id by name
    const selectedStudent = students.find((s) => s.name === form.studentName);
    if (!selectedStudent) return alert("Selected student not found");

    try {
      const res = await fetch(COURSES_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          student_id: selectedStudent.id,
        }),
      });
      if (!res.ok) throw new Error("Failed to add course");
      setForm({ title: "", description: "", studentName: "" });
      fetchCourses();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete course
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      const res = await fetch(`${COURSES_API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      fetchCourses();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Courses</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ marginRight: 10 }}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          style={{ marginRight: 10 }}
        />

        <select
          name="studentName"
          value={form.studentName}
          onChange={handleChange}
          required
          style={{ marginRight: 10 }}
        >
          <option value="" disabled>
            Select Student
          </option>
          {students.map((student) => (
            <option key={student.id} value={student.name}>
              {student.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Course</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Student Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(({ id, title, description, student_id }) => {
              const student = students.find((s) => s.id === student_id);
              return (
                <tr key={id}>
                  <td>{title}</td>
                  <td>{description}</td>
                  <td>{student ? student.name : "Unknown"}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
