import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
const PlaceOrder = () => {


 const {getTotalCartAmount} =useContext (StoreContext);


  return (
    <form action="" className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' />
          <input type="text"  placeholder='Last Name'/>
        </div>
        <input type="email" placeholder='Email'/>
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text"  placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip Code' />
          <input type="text"  placeholder='Country'/>
        </div>
        <input type='number' placeholder='Phone' />
      </div>
      <div className="place-order-right">
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
          <button>Proceed to Payment</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
