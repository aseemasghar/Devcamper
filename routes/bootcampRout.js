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


// Route to get all courses of specific bootcamp
router.route("/:bootcampid/courses").get(getAllCourses).post(createCourse);

// Route controllers
router.route("/").get(getAllBootcamps).post(createBootcamp);
router.route("/:id").get(getSingleBootcamp).put(updateBootcamp).delete(deleteBootcamp);
router.route('/:bootcampid/photo').put(bootcampFileUpload);
module.exports = router;
