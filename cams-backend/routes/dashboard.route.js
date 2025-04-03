const express = require('express');
const dashboardController = require('../controller/dashboard.controller');
const router = express.Router();

router.get('/', dashboardController.getDashboardStatsAdmin);
router.get('/college', dashboardController.getDashboardStatsCollege);
module.exports = router;