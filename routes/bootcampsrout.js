const express = require("express");
const router = express.Router();
const {
  getAllBootcamps,
  getSingleBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcampsController");

// import course router
const coursesRout = require('./coursesRout');

// Re_route 
router.use('/:bootcamp/courses',coursesRout);

// import controllers
router.route("/").get(getAllBootcamps);
router.route("/:id").get(getSingleBootcamp);
router.route("/").post(createBootcamp);
router.route("/:id").put(updateBootcamp);
router.route("/:id").delete(deleteBootcamp);

module.exports = router;
