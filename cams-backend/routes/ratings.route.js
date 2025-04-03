const express = require("express");
const router = express.Router();
const ratingController = require("../controller/rating.controller");

// POST: Add a rating
router.post("/add", ratingController.createRating);

// GET: Get all ratings for a college
router.get("/single/:collegeId", ratingController.getRatingsByCollege);

// DELETE: Remove a rating
router.delete("/:id", ratingController.deleteRating);

router.get("/practice/:collegeId", ratingController.practice);

module.exports = router;
