const express = require("express");
const router = express.Router();
const {
  getCourses,
  addCourse,
  deleteCourse,
} = require("../controllers/courseController");

router.get("/", getCourses);
router.post("/", addCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
