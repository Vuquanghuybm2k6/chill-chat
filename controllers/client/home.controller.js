// [GET]: /home
module.exports.index = (req, res) => {
  if (!req.cookies.tokenUser) {
    return res.redirect("/user/login")
  }

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ"
  })
}