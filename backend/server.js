import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"



//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();


//api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
//any file in upload older now can be accessed via /images/filename due to above line
app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter)



app.get("/",(req,res)=>{
    res.send("API Working")
})


app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://GreatStack:9027474094@cluster0.pk61mav.mongodb.net/?