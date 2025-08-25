require("dotenv").config()
require("express-async-errors")


const express = require("express")
const app = express()
const connectDB = require("./DB/connect")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const cors = require("cors")



const authRouter = require("./routes/authRoute")
const userRouter = require("./routes/userRoute")
const productRouter = require("./routes/productRoute")
const reviewRouter = require("./routes/reviewRoute")
const orderRouter = require("./routes/orderRoute")
const cartRouter = require("./routes/cartRoute")
const complaintRouter = require("./routes/complaintRoute")


const {authenticateUser, authorizeUser} = require("./middlewares/unAuthorized")
const notFoundMiddleware = require("./middlewares/notFound")
const errorHandlerMiddleware = require("./middlewares/errorHandler")

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
}))
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.static("./public"))
app.use(
    fileUpload({
      useTempFiles: true, // Enables temporary file storage
      tempFileDir: '/tmp/', // Specify a directory for temporary files
    })
  );

app.get("/api/v1", (req, res) => {
    console.log(req.signedCookies);
    res.send("ecommerce is on")
    
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", authenticateUser, userRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/orders", authenticateUser, orderRouter)
app.use("/api/v1/cart", authenticateUser, cartRouter)
app.use("/api/v1/complaint", authenticateUser, complaintRouter)



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 10000

//connection
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, console.log(`server is well listening on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()