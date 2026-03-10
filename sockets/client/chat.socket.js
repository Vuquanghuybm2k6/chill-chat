const Chat = require("../../models/chat.model")
module.exports = async (req,res) =>{
  const userId = res.locals.user.id
  const fullName = res.locals.user.fullName
  const roomChatId = req.params.roomChatId
  _io.once('connection', (socket)=>{
    socket.join(roomChatId)
    socket.on("CLIENT_SEND_MESSAGE", async (content)=>{
      // Lưu vào db
      const chat = new Chat({
        user_id: userId,
        content: content,
        room_chat_id: roomChatId
      })
      await chat.save()
      // Trả data về client
      _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE",{
        userId: userId,
        fullName: fullName,
        content: content,
        room_chat_id: roomChatId
      })
    })
  })
}