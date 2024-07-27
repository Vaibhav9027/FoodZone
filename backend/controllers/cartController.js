import userModel from "../models/userModel.js"

//add items to user cart
const addToCart = async (req,res) =>{
 try {
    let userData = await userModel.findById(req.body.userId);
     //or
       //let userData = await userModel.findOne ({_id:req.body.userId})
       //notes--while finding the id this conditon should be followed id should be same as req.body.userId that we will get by using middleware
       //extract the cart data
       let cartData = await userData.cartData;
       //when user want to add the item to cart they will send the token with the item id here is logic for that
       if(!cartData[req.body.itemId])// if that item not present create a new entry
       {
        cartData[req.body.itemId] = 1;
       }
       else{//if that item is alreadty there increase thevalue
        cartData[req.body.itemId] += 1;
       }
       //update the cart using this new cartdata
       await userModel.findByIdAndUpdate(req.body.userId,{cartData});
       res.json({success:true,message:"Added to Cart"})
 } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
 }
}


//remove items from user cart
const removeFromCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId)//same cocept userid will getting rom midlleware auth.js
        //get user cart data or extract the cart data
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0)// if that item not present create a new entry
        {
         cartData[req.body.itemId] -= 1;

        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from Cart"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}


//fetch user cart data
const getCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        res.json({success:true,cartData})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }//for this in thunder clienyt we dont have to give user id in body -json section just token in header section is sufficient
    
}


export {addToCart, removeFromCart,getCart}