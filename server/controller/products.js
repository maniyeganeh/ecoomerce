const Products = require("../models/products")
const User = require("../models/user")


exports.getProducts = async (req, res) => {

    try {
        // const products = await Products.find({}).sort({ _id: -1 })
        res.status(200).json(res.paginatedResults)
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message })
    }
}
exports.searchProducts = async (req, res) => {
    // const { category, search } = req.body;
    // try {
    //     if (category) {
    //         const products = await Products.find({ category: { $in: category } })
    //         res.status(200).json(products)
    //     } else if (search) {
    //         const products = await Products.find({ title: { $regex: search, $options: "i" } })
    //         res.status(200).json(products)
    //     } else {
    //         const products = await Products.find({})
    //         res.status(200).json(products)
    //     }

    // }
    // catch (err) {
    //     res.status(500).json({ message: err.message })
    // }

    res.status(200).json(res.paginatedResults)

}
exports.getSingleProduct = async (req, res) => {
    const prodId = req.params.prodId

    try {
        const product = await Products.findOne({ slug: prodId }).populate("creator", "-password")
        if (!product) return res.status(404).json({ message: "Product Not Found" })
        res.status(200).json({ product })
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong" })
    }
}

exports.createProduct = async (req, res) => {
    const { title, subtitle, description, price, sale, off, tags, category, newProd, slug } = req.body
    const images = req.files;
    const creator = req.userId
    const product = new Products({
        title,
        subtitle,
        description,
        images,
        price,
        sale,
        off,
        tags: tags.split(","),
        newProd,
        category: category.split(","),
        creator,
        slug
    })
    let user;
    try {
        user = await User.findById(creator)
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong" })

    }
    if (!user) return res.status(404).json({ message: "User Not Found" })
    try {
        await product.save()
        user.products.push(product)
        await user.save()
        res.status(201).json(product)
    }
    catch (err) {
        res.status(500).json({ message: "Something Went Wrong" })
    }
}

exports.removeProduct = async (req, res) => {
    const prodId = req.params.prodId;


    try {
        const product = await Products.findById(prodId)
        if (!product) return res.status(404).json({ message: "Product Not Found" })
        await Products.findByIdAndDelete(prodId)
        let user;
        user = await User.findById(req.userId)
        user.products.pull(prodId)
        await user.save()
        res.status(200).json({ message: "Product Deleted" })
    }
    catch (err) {
        res.status(500).json({ message: "something went wrong" })
    }
}

exports.updateProduct = async (req, res) => {
    const prodId = req.params.prodId;
    const { title, description, subtitle, price, sales, off, tags, newProd, category } = req.body;
    const creator = req.userId
    try {
        const product = await Products.findById(prodId)
        if (product.creator.toString() !== creator) return res.status(401).json({ message: "This is not your product" })
        if (!product) return res.status(404).json({ message: "Product Not Found!" })

        // tags: tags.split(",")

        const updatedProduct = { title, description, subtitle, price, sales, off, tags, newProd, category, creator, _id: prodId }
        await Products.findByIdAndUpdate(prodId, updatedProduct, { new: true })
        res.status(200).json(updatedProduct)
    }
    catch (err) {
        res.status(500).json({ message: "Something Went Wrong" })
    }
}
exports.postComment = async (req, res) => {
    const prodId = req.params.prodId;
    const { value } = req.body;
    const product = await Products.findById(prodId);
    product.comments.push(value);
    const updatedProduct = await Products.findByIdAndUpdate(prodId, product, { new: true })
    res.status(201).json(updatedProduct)
}