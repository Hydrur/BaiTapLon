const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/reader.controller");

router.post('/register', controller.create)

// router.put('/:id', users.updateFavorite)
// router.put('/:id', users.updateCart)
// router.put('/:id', users.deleteProductFromCart)

module.exports = router;