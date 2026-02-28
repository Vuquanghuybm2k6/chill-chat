require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

const routeClient = require("./routes/client/index.route")

// Kết nối với db
const database = require("./config/database")
database.connect()
// End Kết nối với db

// Flash
const session = require("express-session")
const cookieParser = require("cookie-parser")
var flash = require('express-flash') 
app.use(cookieParser('keyboard cat'));
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}));
app.use(flash());
// End Flash

// Giả phương thức
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
// End Giả phương thức

// Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended : false}))
// End Body Parser

const http = require("http")
const { Server } = require("socket.io")
// Socket io
const server = http.createServer(app)
const io = new Server(server)
global._io = io
// End Socket io

app.set("views", `${__dirname}/views`)
app.set("view engine", `pug`)

app.use(express.static("./public"))

routeClient(app)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
