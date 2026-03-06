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

      // Cập nhật số lượng lời mời cho B
      const infoUserB = await User.findOne({_id: idB})
      const lengthAcceptFriend = infoUserB.acceptFriends.length
      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",({idB: idB, lengthAcceptFriend: lengthAcceptFriend}))
      // Lấy thông tin của A và trả về cho B
      const infoUserA = await User.findOne({
        _id: idA
      }).select("id, fullName avatar")
      socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
        idB: idB,
        infoUserA: infoUserA
      })

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
      const infoUserB = await User.findOne({_id:idB})
      const lengthAcceptFriend = infoUserB.acceptFriends.length
      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",{
        idB: idB,
        lengthAcceptFriend: lengthAcceptFriend
      })

      // Lấy userId của A để trả về cho B
      socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND",{
        idA: idA,
        idB: idB
      })
    })

    // A từ chối kết bạn của B
    socket.on("CLIENT_REFUSE_FRIEND", async(idB)=>{
      // Kiểm tra id của A có trong requestFriends của B 
      const existUserAInB = await User.findOne({
        _id: idB,
        requestFriends: idA
      })
      if(existUserAInB){
        await User.updateOne({
          _id: idB
        },{
          $pull:{
            requestFriends: idA
          }
        })
      }

      // Kiểm tra id của B có trong accept của A
      const existUserBInA = await User.findOne({
        _id: idA,
        acceptFriends: idB
      })
      if(existUserBInA){
        await User.updateOne({
          _id: idA
        },{
          $pull :{
            acceptFriends: idB
          }
        })
      }
    })

    // A đồng ý kết bạn với B
    socket.on("CLIENT_ACCEPT_FRIEND", async(idB)=>{

      const existUserAInB = await User.findOne({
        _id: idB,
        requestFriends: idA
      })
      if(existUserAInB){
        await User.updateOne({
          _id: idB
        },{
          $push:{
            friendList:{  
              user_id: idA,
              room_chat_id: ""
            }
          },
          $pull:{
            requestFriends: idA
          }
        })
      }

      const existUserBInA = await User.findOne({
        _id: idA,
        acceptFriends: idB
      })
      if(existUserBInA){
        await User.updateOne({
          _id: idA
        },{
          $push:{
            friendList:{
              user_id: idB,
              room_chat_id: ""
            }
          },
          $pull :{
            acceptFriends: idB
          }
        })
      }
    })

    
  })
}