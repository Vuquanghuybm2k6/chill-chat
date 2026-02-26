require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

const routeClient = require("./routes/client/index.route")

// Kết nối với db
const database = require("./config/database")
database.connect()
// End Kết nối với db

// Giả phương thức
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
// End Giả phương thức

// Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended : false}))
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
// End Body Parser

app.set("views", `${__dirname}/views`)
app.set("view engine", `pug`)

app.use(express.static("./public"))

routeClient(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
