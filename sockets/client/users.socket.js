const User = require("../../models/user.model")
module.exports = async (req,res) =>{
  _io.once('connection',  (socket)=>{
    const idA = res.locals.user.id

    // A gửi lời mời kết bạn cho B
    socket.on("CLIENT_ADD_FRIEND", async (idB)=>{
      // Kiểm tra xem có Id của A trong acceptFriends của B 
      const existUserAInB = await User.findOne({
        _id: idB,
        acceptFriends: idA
      })
      if(!existUserAInB){
        await User.updateOne({
          _id: idB,
        },{
          $push:{
            acceptFriends: idA
          }
        })
      }
      
      // Kiểm tra xem có id của B trong requestFriends của A
      const existUserBInA = await User.findOne({
        _id: idA,
        requestFriends: idB
      })
      if(!existUserBInA){
        await User.updateOne({
          _id: idA
        },{
          $push:{
            requestFriends:idB
          }
        })
      }

    })
     
    // A hủy gửi yêu cầu kết bạn cho B
    socket.on("CLIENT_CANCEL_FRIEND", async(idB)=>{
      // Kiểm tra id của A có trong acceptFriends của B 
      const existUserAInB = await User.findOne({
        _id: idB,
        acceptFriends: idA
      })
      if(existUserAInB){
        await User.updateOne({
          _id: idB
        },{
          $pull:{
            acceptFriends: idA
          }
        })
      }

      // Kiểm tra id của B có trong requestFriends của A
      const existUserBInA = await User.findOne({
        _id: idA,
        requestFriends: idB
      })
      if(existUserBInA){
        await User.updateOne({
          _id: idA
        },{
          $pull :{
            requestFriends: idB
          }
        })
      }
    })
  })
}