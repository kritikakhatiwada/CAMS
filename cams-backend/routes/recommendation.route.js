const express = require('express')
const router = express.Router()

const recommendationController = require('../controller/recommendation.controller')


router.get('/', recommendationController.getRecommendation)
router.get('/weighted', recommendationController.getRecommendationByWeight)
router.get('/all', recommendationController.getSimilarCoursesAll)
router.get('/low', recommendationController.getLowestFeeCourses)
module.exports = router