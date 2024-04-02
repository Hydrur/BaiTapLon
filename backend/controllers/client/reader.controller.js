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


const addBook = asyncHandler(async (req, res) => {
    try {
        const tokenUser = req.cookies.tokenUser;
        if (tokenUser) {
            const reader = await Reader.findOne({
                token: tokenUser,
            })
            let borrow = {};



            borrow.quantity = req.body.quantity;
            borrow.id_book = req.body.book_id;
            borrow.status = "processing";

            // Kiểm tra xem đã có quyển sách trong mảng borrow chưa
            const existingBook = reader.borrow.find(book => book.id_book === borrow.id_book);

            if (existingBook) {
                // Nếu đã có quyển sách trong mảng borrow, cập nhật số lượng
                existingBook.quantity += borrow.quantity;
            } else {
                // Nếu chưa có quyển sách trong mảng borrow, thêm borrow vào mảng
                reader.borrow.push(borrow);
            }
            // // Lưu thay đổi vào CSDL
            await reader.save();
        }


        // const user = await Reader.create(req.body);
        res.status(200).json("success");
    } catch (error) {
        res.status(500).json({ massage: `Error! ${error}` });
    }
})

const getUser = asyncHandler(async (req, res) => {
    try {
        const tokenUser = req.headers.authorization.split(" ")[1];
        const reader = await Reader.findOne({
            token: tokenUser
        })
        res.status(200).json({ message: "Send reader successfully.", reader });
    } catch (error) {
        res.status(500).json({ massage: `Error! ${error}` });
    }
})

const deleteBook = asyncHandler(async (req, res) => {
    try {
        const tokenUser = req.cookies.tokenUser;
        const id = req.params.id;

        if (tokenUser) {
            const reader = await Reader.findOne({
                token: tokenUser,
            })

            if (reader) {
                // Lọc ra các sách trong borrow mà id_book không bằng id cần xóa
                reader.borrow = reader.borrow.filter(book => book.id_book !== id);

                // Lưu thay đổi vào CSDL
                await reader.save();

                res.status(200).json({ message: "Book deleted successfully." });
            } else {
                res.status(404).json({ message: "Reader not found." });
            }

        } else {
            res.status(401).json({ message: "Unauthorized." });
        }

        // res.status(200).json({ message: "Send reader successfully." , reader});
    } catch (error) {
        res.status(500).json({ massage: `Error! ${error}` });
    }
})

const deleteProductFromCart = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        const productIdToDelete = req.params.productId;

        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Filter out the product to be deleted from the user's cart
        user.cart = user.cart.filter((item) => item.productId.toString() !== productIdToDelete);

        // Update the user document in the database
        const response = await Users.findByIdAndUpdate(userId, { cart: user.cart });

        res.status(200).json({ message: 'Product deleted from cart successfully', response });
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = {
    create,
    addBook,
    getUser,
    deleteBook,
    deleteProductFromCart,
}