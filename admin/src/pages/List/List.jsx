import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios"
import {toast} from 'react-toastify'

const List = ({url}) => {
  // const url = "http://localhost:4000";
  const [list, setList] = useState([]);


  const fetchList = async () => {
  const response = await axios.get(`${url}/api/food/list`);
  // console.log(response.data);
     if(response.data.success)
     {
      setList(response.data.data);
     }
     else{
      toast.error("Error")
     }
  }

  const removeFood = async(foodId) =>{
    // console.log(foodId);// to check foodid is coming to this ffunction
    // we have created the remove food api using post methiod so axios.post
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    //id:foodId using this food item will be removed from data base
    await fetchList();
    if (response.data.success){
      toast.success(response.data.message)

    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
     fetchList();

  },[])

  return (
  <div className="list add flex-col">
    <p>All foods List</p>
    <div className="list-table">
      <div className="list-table-format">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {list.map((item,index)=>{
        return(
          <div  key={index} className="list-table-format">
            <img src={`${url}/images/`+item.image}  alt=""/>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={()=>removeFood(item._id)}  className="cursor">X</p>

          </div>
        )
      })}
    </div>

  </div>
  )
};

export default List;
