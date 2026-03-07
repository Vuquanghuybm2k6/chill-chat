const User = require("../../models/user.model")
module.exports.auth = async (req,res,next) =>{
  if(!req.cookies.tokenUser){
    return res.redirect("/user/login")
  }
  else{
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false
    })
    if(user){
      next()
    }
    else{
      return res.redirect("/user/login")
    }
  }
}