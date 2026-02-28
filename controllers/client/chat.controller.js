const chatSocket = require("../../sockets/client/chat.socket")
// [GET]: /chat
module.exports.index = (req, res) => {
  // Socket io
  chatSocket(req,res)
  // End Socket io
  res.render("client/pages/chat/index", {
    pageTitle: "Kênh chat"
  })
}