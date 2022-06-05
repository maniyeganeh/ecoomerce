const express = require("express");
const { orderSubmit } = require("../controller/order");

const auth = require("../middleware/auth")
const router = express.Router();

router.post("/order-submit", auth, orderSubmit)
module.exports = router