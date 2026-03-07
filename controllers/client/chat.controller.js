const chatSocket = require("../../sockets/client/chat.socket")
const Chat = require("../../models/chat.model")
const User = require("../../models/user.model")
// [GET]: /chat/:roomChatId
module.exports.index = async (req, res) => {
  const roomChatId = req.params.roomChatId
  // Socket io
  chatSocket(req,res)
  // End Socket io
  const chats = await Chat.find({deleted: false, room_chat_id: roomChatId})
  for(const chat of chats){
    const infoUser = await User.findOne({_id: chat.user_id, deleted: false}).select("fullName")
    chat.infoUser = infoUser
  }
  res.render("client/pages/chat/index", {
    pageTitle: "Kênh chat",
    chats: chats
  })
}