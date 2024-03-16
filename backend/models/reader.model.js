const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const readerSchema = new mongoose.Schema({
    fullName: String, 
    dateOfBirth: String,
    gender: Number,
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