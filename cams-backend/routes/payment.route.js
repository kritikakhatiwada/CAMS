const express = require('express');
const router = express.Router();
const roleAuthentication = require('../middlewares/role-auth-middleware');
const { createPayment, handleKhaltiCallback, searchPayment, getAllPayments } = require('../controller/payment.controller');


router.get('/search', roleAuthentication(["ADMIN", "STUDENT"]), searchPayment);


router.get("/:applicationId", roleAuthentication(["ADMIN", "STUDENT"]), createPayment);


router.get("/bill-detail/:applicationId", roleAuthentication(["ADMIN", "STUDENT"]), handleKhaltiCallback);


router.get('/', roleAuthentication(["ADMIN"]), getAllPayments);
module.exports = router;