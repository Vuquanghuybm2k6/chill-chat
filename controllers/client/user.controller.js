const User = require("../../models/user.model")
const md5 = require("md5")
const ForgotPassword = require("../../models/forgot-password.model")
const generateHelper = require("../../helpers/client/generate")
const sendMailHelper = require("../../helpers/client/sendMail")
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
    res.redirect("/user/login")
  }
  else{
    if(md5(req.body.password) == user.password){
      res.cookie("tokenUser", user.tokenUser)
      await User.updateOne({
        _id: user.id
      },{statusOnline:"online"})
      _io.once('connection',(socket)=>{
        socket.broadcast.emit("SERVER_RETURN_USER_ONLINE", user.id)
      })
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
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser")
  await User.updateOne(
    {
      _id: res.locals.user.id
    },{
      statusOnline:"offline"
    })
    _io.once('connection',(socket)=>{
        socket.broadcast.emit("SERVER_RETURN_USER_OFFLINE", res.locals.user.id)
      })
  res.redirect("/user/login")
}

// [GET]: /user/info
module.exports.info = (req, res) => {
  res.render("client/pages/user/info",{
    pageTitle: "Thông tin cá nhân"
  })
}

// [GET]: /user/edit
module.exports.edit = (req, res) => {
  res.render("client/pages/user/edit",{
    pageTitle: "Chỉnh sửa thông tin cá nhân"
  })
}

// [PATCH]: /user/edit
module.exports.editPatch = async (req, res) => {
  const user = res.locals.user
  const emailExist = await User.findOne({_id:{
    $ne: user._id
  },
    email: req.body.email,
    deleted: false
  })
  if(!emailExist){
    if(req.body.password){
      req.body.password = md5(req.body.password)
    }
    else{
      delete req.body.password
    }
    await User.updateOne({_id: user._id}, req.body)
    req.flash("success", "Chỉnh sửa thông tin thành công")
    res.redirect(req.get("Referer"))
  }
  else{
    req.flash("error", "Email đã tồn tại")
    res.redirect(req.get("Referer"))
  }
}

// [GET]: /user/password/forgot
module.exports.forgotPassword = async(req,res) =>{
  res.render("client/pages/user/forgot-password",{
    pageTitle: "Lấy lại mật khẩu"
  })
}

// [POST]: /user/password/forgot
module.exports.forgotPasswordPost = async(req,res) =>{
  const email = req.body.email
  const user = await User.findOne({email: email, deleted: false})
  if(!user){
    req.flash("error","Email không tồn tại")
    return res.redirect(req.get("Referer"))
  }
  await ForgotPassword.deleteMany({email}) // chặn việc người dùng gửi email nhiều lần, khi đó sẽ tạo ra otp rác
  const otp = generateHelper.generateRandomNumber(6)
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expiresAt: Date.now()
  }
  const forgotPassword = new ForgotPassword(objectForgotPassword)
  await forgotPassword.save()
  // Gửi mã otp qua email người dùng
  const subject = `Mã OTP xác minh lấy lại mật khẩu`
  const html = `Mã OTP xác minh lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là 3 phút. Lưu ý không được để lộ mã OTP`
  sendMailHelper.sendMail(email, subject, html)
  res.redirect(`/user/password/otp?email=${email}`)
}

// [GET]: /user/password/otp
module.exports.otpPassword = async(req,res) =>{
  const email = req.query.email
  console.log(email)
  res.render("client/pages/user/otp-password",{
    pageTitle: "Nhập mã OTP",
    email:email
  })
}

// [POST]: /user/password/otp
module.exports.otpPasswordPost = async(req,res) =>{
  const email = req.body.email
  const otp = req.body.otp
  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp
  })
  if(!result){
    req.flash("error","OTP không đúng")
    return res.redirect(req.get("Referer"))
  }
  const user = await User.findOne({
    email: email,
    deleted: false
  })
  res.cookie("tokenUser", user.tokenUser)
  res.redirect("/user/password/reset")
}

// [GET]: /user/password/reset
module.exports.resetPassword = async(req,res) =>{
  res.render("client/pages/user/reset-password",{
    pageTitle: "Đổi mật khẩu",
  })
}

// [POST]: /user/password/reset
module.exports.resetPasswordPost = async(req,res) =>{
  const password = req.body.password
  const tokenUser = req.cookies.tokenUser
  await User.updateOne({
    tokenUser: tokenUser
  },{
    password: md5(password)
  })
  req.flash("success", "Đổi mật khẩu thành công")
  res.redirect("/")
}