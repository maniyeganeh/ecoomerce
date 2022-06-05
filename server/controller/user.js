
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user")


exports.getUser = async (req, res) => {
    const userId = req.params.userId;
    let user;
    try {
        user = await User.findById(userId, "-password")
        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json({ message: "User Not Found" })
    }
}

exports.signup = async (req, res, next) => {
    const { name, email, password, address1, address2, zipCode, phoneNumber } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User Existed" })
        const hashedPw = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashedPw, name, address1, address2, zipCode, phoneNumber })
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
        res.status(201).json({ result: result, token })
    }
    catch (err) {
        res.status(500).json({ message: "Something Went Wrong" })

    }
}

exports.signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.status(404).json({ message: 'Please Signup' })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentianls" })
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
        res.status(200).json({ result: existingUser, token })
    }
    catch (err) {
        res.status(500).json({ message: "Something Went Wrong" })
    }
}
exports.userUpdate = async (req, res) => {
    const userId = req.params.userId;
    const { name, password, address1, address2, zipCode, phoneNumber } = req.body;
    try {
        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ message: "User Not Found" })
        const hashedPw = await bcrypt.hash(password, 12)
        const updatedUser = { name, password: hashedPw, address1, address2, zipCode, phoneNumber, _id: userId }
        await User.findByIdAndUpdate(userId, updatedUser)
        res.status(200).json(updatedUser)
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
}