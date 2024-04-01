const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const readerSchema = new mongoose.Schema({
    fullName: String, 
    email: String,
    password: String,
    token: String,
    address: String,
    phone: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
    },
    { timestamps: true }
)

const Reader = mongoose.model("Reader", readerSchema, "readers");

module.exports = Reader;