const express = require("express")
const router = express.Router()
const controller = require("../../controllers/client/user.controller")
const uploadCloud = require("../../middlewares/client/uploadCloud.middleware")
const multer = require("multer")
const upload = multer()
router.get('/register', controller.register)
router.post(
  '/register',
  upload.single("avatar"),
  uploadCloud.upload,
  controller.registerPost)
module.exports = router