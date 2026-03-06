const User = require("../../models/user.model")
const usersSocket = require("../../sockets/client/users.socket")
// [GET]: /users/not-friend
module.exports.notFriend = async (req, res) => {
  usersSocket(req,res)
  const userId =res.locals.user.id
  const myUser = await User.findOne({_id: userId})
  const requestFriends = myUser.requestFriends
  const acceptFriends = myUser.acceptFriends
  const friendListId = myUser.friendList.map(item=>item.user_id)
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
      },
      {
        _id: {$nin: friendListId}
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

// [GET]: /users/request
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

// [GET]: /users/accept
module.exports.accept = async(req,res) =>{
  usersSocket(req,res)
  const myUser = await User.findOne({_id: res.locals.user.id})
  const acceptFriends = myUser.acceptFriends
  const users = await User.find({
    _id:{
      $in: acceptFriends
    },
    deleted: false,
    status: "active"
  }).select("id fullName avatar")
  res.render("client/pages/users/accept",{
    pageTile: "Lời mời kết bạn",
    users
  })
}

// [GET]: /users/friends
module.exports.friends = async(req,res) =>{
  usersSocket(req,res)
  const myUser = await User.findOne({_id: res.locals.user.id})
  const friendListId = myUser.friendList.map(item =>item.user_id)
  const users = await User.find({
    _id:{
      $in: friendListId
    },
    deleted: false,
    status: "active"
  }).select("id fullName avatar statusOnline")
  const friendList = myUser.friendList
  users.forEach(user=>{
    const infoUser = friendList.find(item => item.user_id == user.id)
    user.roomChatId = infoUser.room_chat_id
  })
  res.render("client/pages/users/friends",{
    pageTile: "Danh sách bạn bè",
    users
  })
}