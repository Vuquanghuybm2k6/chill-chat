const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  user_id: String,
  fullName: String,
  email: String,
  password: String,
  phone: String,
  tokenUser:{
    type: String,
    default: ""
  },
  avatar: String,
  status: {
    type: String,
    default: "active"
  },
  acceptFriends: Array,
  requestFriends: Array,
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
  timestamps: true
});
const User = mongoose.model("User", userSchema, "users")
module.exports = User