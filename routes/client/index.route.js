const homeRoutes = require("./home.route")
const userRoutes = require("./user.route")
const chatRoutes = require("./chat.route")
const usersRoutes = require("./users.route")
const roomsChatRoutes = require("./rooms-chat.route")
const userMiddleware = require("../../middlewares/client/user.middleware")
module.exports = (app) =>{
  app.use(userMiddleware.infoUser)
  app.use("/", homeRoutes)
  app.use("/user", userRoutes)
  app.use("/chat", chatRoutes)
  app.use("/users", usersRoutes)
  app.use("/rooms-chat", roomsChatRoutes)
}