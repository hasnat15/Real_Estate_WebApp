const express = require ("express")
const {signup, signout}= require ("../controllers/auth.controller.js")
const {signin}= require("../controllers/auth.controller.js")
const {google}= require ("../controllers/auth.controller.js")

const router = express.Router()


router.post("/signup", signup)
router.post("/signin", signin)
router.post("/google", google)
router.get('/signout', signout)

module.exports= router