const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const employeeSchema = new mongoose.Schema({
    fullName:String, 
    userName: String, 
    password: String, 
    position: String,
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

const Employee = mongoose.model("Employee", employeeSchema, "employees");

module.exports = Employee;