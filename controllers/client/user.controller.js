const User = require("../../models/user.model")
const md5 = require("md5")

// [GET]: /user/register
module.exports.register = (req, res) => {
  res.render("client/pages/user/register",{
    pageTitle: "Đăng kí tài khoản"
  })
}

// [POST]: /user/register
module.exports.registerPost = async (req, res) => {
  const emailExist = await User.findOne({email: req.body.email, deleted: false})
  if(emailExist){
    req.flash("error", "Emai đã tồn tại")
    return res.redirect(req.get("Referer"))
  }
  else{
    req.body.password = md5(req.body.password)
    const user = new User(req.body)
    await user.save()
    res.cookie("tokenUser", user.tokenUser)
    req.flash("success", "Đăng kí tài khoản thành công")
    res.redirect("/")
  }
}

// [GET]: /user/login
module.exports.login = (req, res) => {
  res.render("client/pages/user/login",{
    pageTitle: "Đăng nhập tài khoản"
  })
}

// [POST]: /user/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email
  const user = await User.findOne({email: email, deleted: false})
  if(!user){
    req.flash("error", "Email không tồn tại")
    res.redirect("/")
  }
  else{
    if(md5(req.body.password) == user.password){
      res.cookie("tokenUser", user.tokenUser)
      req.flash("success", "Đăng nhập thành công")
      res.redirect("/")
    }
    else{
      req.flash("error", "Đăng nhập thất bại")
      res.redirect(req.get("Referer"))
    }
  }
}

// [GET]: /user/logout
module.exports.logout = (req, res) => {
  res.clearCookie("tokenUser")
  res.redirect("/user/login")
}

// [GET]: /user/info
module.exports.info = (req, res) => {
  res.render("client/pages/user/info")
}