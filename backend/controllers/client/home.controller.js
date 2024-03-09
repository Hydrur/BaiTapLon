// [GET] /
module.exports.index = (req, res) => {
  res.send("OK FE")
  // res.render("admin/pages/dashboard/dashboard.pug", {
  //   pageTitle: 'DashBoard'
  // })
}