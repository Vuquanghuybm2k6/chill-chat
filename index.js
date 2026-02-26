require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

const routeClient = require("./routes/client/index.route")

app.set("views", `${__dirname}/views`)
app.set("view engine", `pug`)
app.use(express.static("./public"))
routeClient(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
