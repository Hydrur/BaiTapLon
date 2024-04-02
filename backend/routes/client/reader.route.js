const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/reader.controller");
const authMiddleware = require("../../middlewares/client/auth.middleware");

router.post('/register', controller.create)

router.post('/addbook',authMiddleware.authRequire, controller.addBook)

router.get('/user', controller.getUser)

router.delete('/deletebook/:id', controller.deleteBook)

router.get('/retrieveallreaders', controller.retrieveAllReaders)


router.post('/changestatus/:readerId/:bookId', controller.changeStatus)

router.get('/infor', controller.getInfor)


module.exports = router;