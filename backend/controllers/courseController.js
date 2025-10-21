const db = require("../db");

exports.getCourses = (req, res) => {
  db.query("SELECT * FROM courses", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.addCourse = (req, res) => {
  const { title, description, student_id } = req.body;
  db.query(
    "INSERT INTO courses (title, description, student_id) VALUES (?, ?, ?)",
    [title, description, student_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Course added", id: result.insertId });
    }
  );
};

exports.deleteCourse = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM courses WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Course deleted" });
  });
};
