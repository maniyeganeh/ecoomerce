const Order = require("../models/order");
const User = require("../models/user")
const Product = require("../models/products")
exports.orderSubmit = async (req, res) => {
    const { items, quantity, totalPrice, shippingOption, payment } = req.body

    const creator = req.userId;
    // const findItems = items.split(",").map((item) => {
    //     console.log(item);
    //     Product.findById(item)
    // })
    // console.log(findItems);
    const order = new Order({
        items: items.split(","),
        quantity,
        totalPrice,
        shippingOption,
        payment,
        creator
    })
    const user = await User.findById(creator)
    if (!user) return res.status(401).json({ message: "User Not Found" })
    try {
        await order.save()
        user.order.push(order)
        await user.save()
        res.status(201).json(order)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something Went Wrong" })
    }

}