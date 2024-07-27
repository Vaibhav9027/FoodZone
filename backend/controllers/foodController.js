import foodModel from "../models/foodModel.js";

import fs from 'fs'

// add food item controller function
//http://localhost:4000/api/food/add in thunderclient
const addFood = async (req,res) => {

    let image_filename= `${req.file.filename}`;

    const food= new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image: image_filename
    })
    try{
       await food.save();
       res.json({success:true,message:"Food Added"})//food will be saved in the database
    }catch (error){
       console.log(error)
       res.json({success:false,message:"Error"})
    }

}
//list food api end point 
//all food list
// thunder client mein ye jaakre daalkar dekho kya kar rha h http://localhost:4000/api/food/list

const listFood =async (req,res)=>{
try {
    const foods =await foodModel.find({});
    res.json({success:true,data:foods})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}
}

//remove food item
const removeFood = async (req,res)=>{
try {
    const food =await foodModel.findById(req.body.id);// mongo db automatically create this unique id of every product----- we r finding the data which we want to delete first
    fs.unlink(`uploads/${food.image}`,()=>{})//to remove photo from uploads folder 
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
    
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}
}



export {addFood,listFood,removeFood}