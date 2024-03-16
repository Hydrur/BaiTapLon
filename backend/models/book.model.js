const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const bookSchema = new mongoose.Schema({
    id_publisher: String,
    bookTitle: String,
    price: Number,
    quantity: Number,
    publishYear: String,
    author: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
    },
    { timestamps: true }
)

const Book = mongoose.model("Book", bookSchema, "books");

module.exports = Book;