const jwt = require("jsonwebtoken")


module.exports = async (req, res, next) => {

    const authHeader = req.get("Authorization")
    if (!authHeader) {
        return res.status(401).json({ message: "Not Authorized" })

    }
    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
        decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)


    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" })

    }
    if (!decodedToken) {
        return res.status(401).json({ message: "Not Authorized" })

    }
    req.userId = decodedToken.id;
    next()
}