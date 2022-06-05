
const express = require("express")
const { getBanner, createBanner, removeBanner, updateBanner } = require("../controller/banner");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", getBanner)
router.delete("/:bannerId", auth, removeBanner)
router.post("/create-banner", auth, createBanner)
router.patch("/:bannerId", auth, updateBanner)


module.exports = router