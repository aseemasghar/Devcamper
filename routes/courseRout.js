const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// Auth protect middleware
const{protect} = require('../middlewares/auth');

// import controllers
router.route("/").get(getAllCourses);
router.route("/:courseid").get( getSingleCourse);
router.route("/:id").put(protect,updateCourse).delete(protect,deleteCourse);


module.exports = router;
