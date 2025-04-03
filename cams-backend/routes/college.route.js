const express = require('express');
const collegeController = require('../controller/college.controller');
const upload = require('../handlers/multer');
const roleAuthentication = require("../middlewares/role-auth-middleware");

const router = express.Router();

// Routes
router.post('/', upload.single("collegeLogo"), collegeController.createCollegeWithCourses);
router.get('/', collegeController.getAllCollegesWithCourses);
router.get('/by-name', collegeController.findCollegeByName);
router.get('/search', collegeController.searchColleges);
router.get('/by-course', collegeController.findCollegeByCourses);
router.get('/own', collegeController.fetchOwnCollege);
router.get('/detail/:id', collegeController.getCollegeById);
router.delete('/delete/:id', collegeController.deleteCollege);
router.put('/update/:id', roleAuthentication(["COLLEGE", "ADMIN"]), collegeController.updateCollege);
router.get('/collect', collegeController.responseD)

module.exports = router;
