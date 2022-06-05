
const express = require("express")
const { signup, signin, getUser, userUpdate } = require("../controller/user")
const auth = require("../middleware/auth");

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/:userId", getUser)
router.patch("/update/:userId", auth, userUpdate)

module.exports = router