const db = require("../db");

exports.getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.addStudent = (req, res) => {
  const { name, email } = req.body;
  db.query(
    "INSERT INTO students (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Student added", id: result.insertId });
    }
  );
};

exports.deleteStudent = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM students WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Student deleted" });
  });
};
