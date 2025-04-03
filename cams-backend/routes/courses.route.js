const express = require('express');
const coursesController = require('../controller/courses.controller');
const router = express.Router();

router.get('/all', coursesController.getAllUniqueCourses);
router.get('/:id', coursesController.getCourseById);

module.exports = router;