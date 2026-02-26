const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  user_id: String,
  fullName: String,
  email: String,
  password: String,
  phone: String,
  tokenUser: String,
  avatar: String,
  status: {
    type: String,
    default: "active"
  },
  acceptFriends: String,
  requestFriend: String,
  friendList: [
    {
      user_id: String,
      room_chat_id: String
    }
  ],
  statusOnline: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
},{
  timestamp: true
});
const User = mongoose.model("User", userSchema, "users")
module.exports = User