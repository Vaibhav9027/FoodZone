import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url} = useContext(StoreContext);
  
  const navigate = useNavigate();


  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {/* we give individual item and index no so that we can det our item one by one */}
        {food_list.map((item,index)=>{
          // comparing cart items and food items
           if(cartItems[item._id] > 0){
            return(
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/"+item.image}/>
                  {/* item.image gives the image name */}
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  {/* it will provide the quantity of items ^--total price neeche vala code */}
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                </div>
                 <hr />
              </div>
              
            )
           }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
              {/* ye isliye ki har time 2 dollar show na kre cart items ho kuch means total amount is not zero then show two dollar */}
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            {/* here also if cart total amount is zero matlab no item in cart then 0 show kar varna total amount mein 2(delivery charge) add krke show kar  */}
            </div>
            
          </div>
          <button onClick={()=>navigate('/order')}>Proceed to Checkout</button>
        </div>
        <div className='car-promocode'>
          <div>
            <p>Enter your promo code here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>

            </div>
          </div>

        </div>
      </div>
      
    </div>
  )
}

export default Cart
