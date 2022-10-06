const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/coursesController");

// import controllers
router.route("/").get(getAllCourses);
router.route("/:id").get(getSingleCourse);
router.route("/").post(createCourse);
router.route("/:id").put(updateCourse);
router.route("/:id").delete(deleteCourse);

module.exports = router;
