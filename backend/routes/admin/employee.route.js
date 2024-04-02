const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/employee.controller');

router.get('/infor', controller.getInfor);


module.exports = router;