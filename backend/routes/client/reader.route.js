const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/reader.controller");

// router.post('/register', controller.create)

router.post('/addbook', controller.addBook)

router.get('/user', controller.getUser)

router.delete('/deletebook/:id', controller.deleteBook)

router.get('/infor', controller.getInfor)

router.get('/numberbookborrowed/:id_book', controller.getNumberBookBorrowed)


module.exports = router;