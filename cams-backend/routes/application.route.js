const express = require('express');
const applicationController = require('../controller/application.controller');
const router = express.Router();
const roleAuthentication = require("../middlewares/role-auth-middleware");


router.get('/all', roleAuthentication(["STUDENT"]), applicationController.getMyApplications);
router.get('/single/:id', roleAuthentication(["STUDENT"]), applicationController.getApplicationById);
router.post('/apply', roleAuthentication(["STUDENT"]), applicationController.createApplication);
router.put('/approve/:id', roleAuthentication(["COLLEGE"]), applicationController.approveApplication);
router.put('/reject/:id', roleAuthentication(["COLLEGE"]), applicationController.rejectApplication);
router.get('/college', roleAuthentication(["COLLEGE"]), applicationController.getApplicationOfCollege);


module.exports = router;