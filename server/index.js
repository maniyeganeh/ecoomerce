const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const multer = require("multer")
const cors = require("cors")
const { v4: uuidv4 } = require("uuid")
const dotEnv = require("dotenv")
const productsRoutes = require("./routes/products")
const userRoutes = require("./routes/user")
const bannerRoutes = require("./routes/banner")
const orderRoutes = require("./routes/order")

const app = express();
dotEnv.config()
const MONGOOSE_URI = process.env.CONNECTION_URL

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "-" + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    const fileTypeFilter = file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/gif" || file.mimetype === "image/webp"
    if (fileTypeFilter) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(bodyParser.json())
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('images', 10))
app.use("/images", express.static(path.join(__dirname, 'images')))
app.use(cors())
app.use("/product", productsRoutes)
app.use("/user", userRoutes)
app.use("/banner", bannerRoutes)
app.use("/order", orderRoutes)
mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false }).then(() => {
    console.log("Connected to the database");
    app.listen(process.env.PORT || 8000)
}).catch(err => {
    console.log(err);
})
