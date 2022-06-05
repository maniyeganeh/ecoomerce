
const express = require("express")
const Products = require("../models/products")
const { createProduct, getProducts, getSingleProduct, removeProduct, updateProduct, postComment, searchProducts } = require("../controller/products");
const auth = require("../middleware/auth");
const paginatedResults = require("../middleware/paginatedResult")

const router = express.Router();

router.get("/", paginatedResults.paginatedResults(Products), getProducts)
router.get("/:prodId", getSingleProduct)
router.delete("/:prodId", auth, removeProduct)
router.post("/create-product", auth, createProduct)
router.get("/search/:query", paginatedResults.searchPagniated(Products), searchProducts)
router.patch("/:prodId", auth, updateProduct)
router.post("/:prodId/submit-comment", auth, postComment)

module.exports = router