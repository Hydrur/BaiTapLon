// [GET] /admin/dashboard
module.exports.index = (req, res) => {
  res.send("OK BE")
  // res.render("admin/pages/dashboard/dashboard.pug", {
  //   pageTitle: 'DashBoard'
  // })
}