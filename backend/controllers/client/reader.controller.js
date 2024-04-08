const Reader = require("../../models/reader.model");
const Book = require('../../models/book.model');
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

            let borrow_item = {};

            borrow_item.quantity = req.body.quantity;
            borrow_item.id_book = req.body.book_id;
            borrow_item.borrowDate = req.body.borrowDate;
            borrow_item.returnDate = req.body.returnDate;
            borrow_item.status = "processing";

            //======================================================
            // Kiểm tra số lượng book được mượn còn không, nếu < 1 quyển thì mượn không được
            const readers = await Reader.find({});

            let borrowedBookQuantity = 0;

            readers.forEach(function (reader) {
                reader.borrow.forEach(function (borrow) {
                    if (borrow.id_book === req.body.book_id) {
                        borrowedBookQuantity += borrow.quantity;
                    }
                });

            });

            const book = await Book.findById({
                _id: req.body.book_id
            })

            if (book.quantity === 0) {
                // Không có sách trong kho
                console.log("Không còn sách trong kho để mượn")
                return res.status(400).json({ message: "Không còn sách trong kho để mượn" });
            } else if (book.quantity - borrowedBookQuantity -  borrow_item.quantity <0) {
                // Số lượng sách đã được mượn bằng hoặc vượt quá số lượng sách trong kho
                console.log( "Số lượng sách đã mượn đã đạt tới giới hạn")
                return res.status(400).json({ message: "Số lượng sách đã mượn đã đạt tới giới hạn" });
            }

            //=======================================================
            // Kiểm tra xem đã có quyển sách trong mảng borrow chưa
            const existingBook = reader.borrow.find(book => book.id_book === borrow_item.id_book);

            if (existingBook) {
                // Nếu đã có quyển sách trong mảng borrow, cập nhật số lượng
                existingBook.quantity += borrow_item.quantity;
                existingBook.borrowDate = borrow_item.borrowDate;
                existingBook.returnDate = borrow_item.returnDate;
                existingBook.status = "processing";

            } else {
                // Nếu chưa có quyển sách trong mảng borrow, thêm borrow vào mảng
                reader.borrow.push(borrow_item);
            }
            // // Lưu thay đổi vào CSDL
            await reader.save();
        }
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

const getInfor = asyncHandler(async (req, res) => {
    try {
        const token = req.cookies.tokenUser;
        const reader = await Reader.findOne({
            token: token,
        })
        res.status(200).json({ message: 'Send employee successfully', reader });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

const getNumberBookBorrowed = asyncHandler(async (req, res) => {
    try {


        console.log('req.params.id_book', req.params.id_book)

        const readers = await Reader.find({});

        let borrowedBookQuantity = 0;

        readers.forEach(function (reader) {
            reader.borrow.forEach(function (borrow) {
                if (borrow.id_book === req.params.id_book) {
                    borrowedBookQuantity += borrow.quantity;
                }
            });

        });


        res.status(200).json({ message: 'Send NumberBookBorrowed successfully', borrowedBookQuantity });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

module.exports = {
    create,
    addBook,
    getUser,
    deleteBook,
    retrieveAllReaders,
    changeStatus,
    getInfor,
    getNumberBookBorrowed,
}