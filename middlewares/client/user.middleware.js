const User = require("../../models/user.model")
module.exports.infoUser = async (req,res,next) =>{
  const tokenUser = req.cookies.tokenUser
  if(tokenUser){
    const user = await User.findOne({tokenUser: tokenUser, deleted: false})
    if(user){
      res.locals.user = user
    }
  }
  next()
}