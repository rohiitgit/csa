const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const { userRouter } = require("./routes/user")
const { adminRouter } = require("./routes/admin")
const { courseRouter } = require("./routes/course")


const app = express();
app.use(express.json());


app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/course", courseRouter)

async function main() {
    await mongoose.connect(process.env.URI)
    app.listen(3000);
    console.log("connected")
}

main()