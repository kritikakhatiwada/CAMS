const express = require("express");
const router = express.Router();
const studentController = require("../controller/student.controller");

// Create a new student with education details
router.post("/add",  studentController.createStudentWithEducation);

// Update a student and their education records
router.put("/update/:id", studentController.updateStudentWithEducation);

// Delete a student and their education records
router.delete("/:id", studentController.deleteStudentWithEducation);

// Get all students with their education details
router.get("/", studentController.getAllStudentsWithEducation);

// Get a single student by ID with their education details
router.get("/single/:id", studentController.getStudentById);

router.get("/own", studentController.getStudentDetails)

router.post("/own-college", studentController.acceptedCollegeStudents)

module.exports = router;
