const express = require("express")
const router = express.Router()
const {
    verifyEmail,
    register,
    login,
    logout
} = require("../controllers/authController")
const { create } = require("../models/user")


router.post('/register', register)
router.post("/login", login)
router.get("/logout", logout)
router.route('/verify-email').post(verifyEmail)

module.exports = router


// fati---------customer
// rand1--------business