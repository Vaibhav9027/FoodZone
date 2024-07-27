import { createContext,  useEffect,  useState } from "react";
//removing the imported food list//import { food_list } from "../assets/assets";
import axios from 'axios';
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // add to cart logic
  const [cartItems, setCartItems] = useState({});
 const url ="http://localhost:4000"//backend url 
 const [token, setToken] =useState("");
 //fetching food data on frontenred from database-- we add via admin section
 const [food_list,setFoodList] =useState([])

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      //when the user add the item first time in the cart then thi statement will be executed and 1 one entry will be generated and the key id will be itemid and value will be no. of quantity
      setCartItems((prev) => ({ ...prev, [itemId]: 1 })); //new entry for our product
    } else {
      // iff that product is already available increase by 1
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    //now logic comes here orwe can say attached here that is adding or removing from cart also gets updated in db also logic is in--backend--controllers--cartcontrollers file
    if (token){
      //upar async iski wajah se bnaya h or iske neeche wale code ke liye
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
       //item id we r getting from above function mein jo mmili h or hum headers mein token ko set kar rhe h

    }

  };

  //remove from cart -- decrease by 1
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){//if we have token it means user is logged in
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})

    }
  };

  //function to return cart total
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) { //here cartitems is an object and for in loop will give each item one by one and this item will be the key item of the cartitems
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item); //if our producty value is matching item which key value of item it means this product is available in the cart in that case aage code
        totalAmount += itemInfo.price * cartItems[item]; //ek ke price se multiply
      }
    }
    return totalAmount;
  };
 // so that the added items do not get removed on refreshing page jab tak user login h
  const loadCartData = async (token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    //variable to store data
    setCartItems(response.data.cartData);

  }


  //fetching data
  const fetchFoodList = async () =>{
    // calling api
    const response = await axios.get(url+"/api/food/list");//bcz we have created food list api using get method
    setFoodList(response.data.data)
  }


  // useEffect(()=>{
  //   console.log(cartItems);
  // },[cartItems])
  //we were using this to check cart items

  //now to keep local storage data saved in the token state when we refresh the web page -----after refereshing the page during logged in state --it(token)should not be removed or logout until we do so--below code

  useEffect(()=>{
    
    async function loadData (){
      await fetchFoodList();
      if (localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
        // this function get called everytime page got refreshed ,key name- token

      }

    }
    loadData();

  },[])


  const contextValue = {
    food_list,
    cartItems, // now we can access it using context api
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
