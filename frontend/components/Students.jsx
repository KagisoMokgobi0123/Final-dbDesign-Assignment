import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/students";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  // Fetch students from backend
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      alert("Error fetching students");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new student
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Fill all fields");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add student");
      setForm({ name: "", email: "" });
      fetchStudents();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete student by id
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      fetchStudents();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Students</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ marginRight: 10 }}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ marginRight: 10 }}
          type="email"
        />
        <button type="submit">Add Student</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(({ id, name, email }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
