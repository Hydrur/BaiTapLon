const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/employee.controller');

router.get('/infor', controller.getInfor);

router.get('/retrieveallreaders', controller.retrieveAllReaders)

router.post('/changestatus/:readerId/:bookId', controller.changeStatus)

module.exports = router;