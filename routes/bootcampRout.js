const express = require("express");
const router = express.Router();
const {
  getAllBootcamps,
  getSingleBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampFileUpload,
} = require("../controllers/bootcampController");

const {
  getAllCourses,
  createCourse,
} = require("../controllers/courseController");

// Auth protect middleware
const { protect, authRole } = require("../middlewares/auth");

// Route to get all courses of specific bootcamp
router
  .route("/:bootcampid/courses")
  .get(getAllCourses)
  .post(protect, createCourse);

// Route controllers
router
  .route("/")
  .get(getAllBootcamps)
  .post(protect, authRole("publisher", "admin"), createBootcamp);
router
  .route("/:id")
  .get(getSingleBootcamp)
  .put(protect, authRole("publisher", "admin"), updateBootcamp)
  .delete(protect, deleteBootcamp);
router
  .route("/:bootcampid/photo")
  .put(protect, authRole("publisher", "admin"), bootcampFileUpload);
module.exports = router;
