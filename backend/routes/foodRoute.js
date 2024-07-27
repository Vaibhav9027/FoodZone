import express from "express"
import { addFood, listFood, removeFood} from "../controllers/foodController.js"
import multer from "multer"

const foodRouter= express.Router();

//IMAGE STORAGE ENGINE

const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
     // whenver we add images date will be added to original filename making each filename unique
    }
})

const upload =multer({storage:storage})//storage mein apni bnay hui storage pass kri h upar jo bnayi h



foodRouter.post("/add",upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove",removeFood);



export default foodRouter;