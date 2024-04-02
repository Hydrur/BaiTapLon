const Employee = require('../../models/employee.model');

// [GET] /admin/employee/infor
module.exports.getInfor = async (req, res) => {


    try {
        const token = req.cookies.token;
        const employee = await Employee.findOne({
            token: token,
        })
        res.status(200).json({ message: 'Send employee successfully', employee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}