import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://GreatStack:9027474094@cluster0.pk61mav.mongodb.net/FoodieAdda').then(()=>console.log("DB Connected"));
}