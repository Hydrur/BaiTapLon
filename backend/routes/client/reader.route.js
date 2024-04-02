const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/reader.controller");
const authMiddleware = require("../../middlewares/client/auth.middleware");

router.post('/register', controller.create)

router.post('/addbook',authMiddleware.authRequire, controller.addBook)

router.get('/user', controller.getUser)

router.delete('/deletebook/:id', controller.deleteBook)

// router.put('/:id', users.updateFavorite)
// router.put('/:id', users.updateCart)
// router.put('/:id', users.deleteProductFromCart)

module.exports = router;