const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// import controllers
router.route("/").get(getAllCourses);
router.route("/:courseid").get(getSingleCourse);
router.route("/:id").put(updateCourse).delete(deleteCourse);


module.exports = router;
