const RoomChat = require("../../models/room-chat.model")
module.exports.isAccess = async (req, res, next) =>{
  const userId = res.locals.user.id
  const roomChatId = req.params.roomChatId
  try{
    const isAccessRoomChat = await RoomChat.findOne({
      _id: roomChatId,
      "users.user_id": userId,
      deleted: false
    })
    if(isAccessRoomChat){
      next()
    }
    else{
      return res.redirect("/")
    }
  }
  catch(error){
    return res.redirect("/")
  }
}