const express = require("express")
const router = express.Router()
const controller = require("../../controllers/client/user.controller")
const uploadCloud = require("../../middlewares/client/uploadCloud.middleware")
const multer = require("multer")
const upload = multer()
const validate = require("../../validates/client/user.validate")
router.get('/register', controller.register)
router.post(
  '/register',
  upload.single("avatar"),
  uploadCloud.upload,
  controller.registerPost)
router.get('/login', controller.login)
router.post(
  '/login',
  validate.loginPost,
  controller.loginPost)
router.get('/logout', controller.logout)
router.get('/info', controller.info)
module.exports = router