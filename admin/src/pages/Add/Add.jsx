import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const Add = ({url}) => {
  // const url = "http://localhost:4000"; created in app.jsx and passed as props and here destructure it
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    // by default salad show krega
  });

  // a function so that every thing user enter will be updated above---({...data,[name]:value})) takeout previous data and update the value
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  //  useEffect(()=>{
  //   console.log(data);

  //  },[data])//whenver our data will be updated this functikn will excecutes and updates the data in this state variable

  // made to check whether everything is working and updating itself like onchange handler suppose todo

  // api call
  const onSubmitHandler = async (event) => {
    event.preventDefault(); //not reloading the web page
    //insert all these forrm data in a form---`${}` called as template literal
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    //api call usig axios we have created add api using post method thats why axios .post
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      // we will reset the form values
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
        // by default salad show krega
      });
       setImage(false)//so that image got reset
       // now if i add a dish on /add the image will store in backend folder uplaoad olde and data on dta base
       //accesing the image http://localhost:4000/images/1721821786892food_4.png

      toast.success(response.data.message);


    } else {
       toast.error(response.data.message)
    }
  };

  return (
    <div className="add">
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
            {/* image has been selected by below code now above code is to show it */}
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
          {/* open the image selection windoe and select the image */}
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type Here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p> Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
