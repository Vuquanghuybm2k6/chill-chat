const User = require("../../models/user.model")
const usersSocket = require("../../sockets/client/users.socket")
// [GET]: /users/not-friend
module.exports.notFriend = async (req, res) => {
  usersSocket(req,res)
  const userId =res.locals.user.id
  const myUser = await User.findOne({_id: userId})
  const requestFriends = myUser.requestFriends
  const acceptFriends = myUser.acceptFriends
  const users = await User.find({
    $and:[
      {
        _id: {$ne: userId}
      },
      {
        _id: {$nin: requestFriends}
      },
      {
        _id: {$nin: acceptFriends}
      }
    ],
    deleted: false,
    status: "active"
  }). select("avatar fullName")
  
  res.render("client/pages/users/not-friend", {
    pageTitle: "Danh sách người dùng",
    users
  })
}

module.exports.request = async(req,res) =>{
  usersSocket(req,res)
  const myUser = await User.findOne({_id: res.locals.user.id})
  const requestFriends = myUser.requestFriends
  const users = await User.find({
    _id: {$in: requestFriends},
    deleted: false,
    status: "active"
  }).select("id fullName avatar")
  res.render("client/pages/users/request",{
    pageTile: "Lời mời đã gửi",
    users
  })
}