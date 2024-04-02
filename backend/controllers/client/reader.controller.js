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
            borrow.borrowDate = req.body.borrowDate;
            borrow.returnDate = req.body.returnDate;
            borrow.status = "processing";

            // Kiểm tra xem đã có quyển sách trong mảng borrow chưa
            const existingBook = reader.borrow.find(book => book.id_book === borrow.id_book);

            if (existingBook) {
                // Nếu đã có quyển sách trong mảng borrow, cập nhật số lượng
                existingBook.quantity += borrow.quantity;
                existingBook.borrowDate = borrow.borrowDate;
                existingBook.returnDate = borrow.returnDate;
                existingBook.status = "processing";

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

const retrieveAllReaders = asyncHandler(async (req, res) => {
    try {
        const readers = await Reader.find({});
        res.status(200).json(readers);
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const changeStatus = asyncHandler(async (req, res) => {
    try {
        // Lấy thông tin từ request
        const { readerId, bookId } = req.params;
        const { status } = req.body;

        // Kiểm tra xem reader và book có tồn tại không
        const reader = await Reader.findById(readerId);
        if (!reader) {
            res.status(404).json({ message: "Reader not found." });
            return;
        }
        const bookIndex = reader.borrow.findIndex(book => book.id_book === bookId);
        if (bookIndex === -1) {
            res.status(404).json({ message: "Book not found." });
            return;
        }
        console.log("bookIndex", bookIndex)
        // Thay đổi trạng thái sách
        reader.borrow[bookIndex].status = status;

        // // Lưu thay đổi vào CSDL
        await reader.save();

        // Trả về thông báo thành công
        res.status(200).json({ message: "Status updated successfully." });
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

module.exports = {
    create,
    addBook,
    getUser,
    deleteBook,
    retrieveAllReaders,
    changeStatus,
}