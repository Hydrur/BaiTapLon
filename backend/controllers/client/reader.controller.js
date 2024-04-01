const Reader = require("../../models/reader.model");
const asyncHandler = require('express-async-handler');
const generateString = require("../../helpers/generateString");
const create = asyncHandler(async (req, res) => {
    try {
        req.body.token = generateString.generateRandomString(20);
        const user = await Reader.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ massage: `Error! ${error}` });
    }
})


// const updateFavorite = asyncHandler(async (req, res) => {
//     try {
//         // Assuming you have a method in your UserService to update favorites
//         const response = await Users.findByIdAndUpdate(req.params.id, req.body.favorite);
//         res.status(200).json({ message: 'Favorites updated successfully', response});
//     } catch (error) {
//         console.error('Error updating favorites:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })

// const updateCart = asyncHandler(async (req, res) => {
//     try {
//         // Assuming you have a method in your UserService to update favorites
//         const response = await Users.findByIdAndUpdate(req.params.id, req.body.cart);
//         res.status(200).json({ message: 'Cart updated successfully', response });
//     } catch (error) {
//         console.error('Error updating cart:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// const deleteProductFromCart = asyncHandler(async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const productIdToDelete = req.params.productId;

//         const user = await Users.findById(userId);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Filter out the product to be deleted from the user's cart
//         user.cart = user.cart.filter((item) => item.productId.toString() !== productIdToDelete);

//         // Update the user document in the database
//         const response = await Users.findByIdAndUpdate(userId, { cart: user.cart });

//         res.status(200).json({ message: 'Product deleted from cart successfully', response });
//     } catch (error) {
//         console.error('Error deleting product from cart:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


module.exports = {
    create,
}