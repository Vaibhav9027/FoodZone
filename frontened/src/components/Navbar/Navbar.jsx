import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
const Navbar = ({setShowLogin}) => {
   
    const [menu,setMenu]= useState("menu");
    //red dot on cart logic for appear disappear
    const {getTotalCartAmount,token,setToken} =useContext(StoreContext);
    
    const navigate = useNavigate();

    const logout = () => {
     localStorage.removeItem("token");
     setToken("");
     navigate("/")
    }
    // inspect--application--local storage to check token after sign it will be ther --after logout it will be removed


  return (
    <div className='navbar'>
        <Link to="/"><img src={assets.logo} alt="" className='logo'/></Link>
         <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("home")}  className= {menu==="home"?"active":""}>home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")}  className={menu==="menu"?"active":""}>menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")}  className={menu==="mobile-app"?"active":""}>mobile-app</a>
            <a href='#footer'  onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</a>
         </ul>
         <div className="navbar-right">
            <img src={assets.search_icon} alt=""/>
            <div className="navbar-search-icon">
                <Link to="/cart"><img src={assets.basket_icon} alt=""/></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>

                {/* here if totalcartamount is zero no red dot otherwise red dot */}
            </div>
           {/* to convert sign in into proile icon upon signed in */}
             {!token? <button onClick={()=>setShowLogin(true)}>Sign in</button>
             :<div className='navbar-profile'>
              {/* if token is available then we will execute this div */}
                  <img src={assets.profile_icon} alt=''/>
                   <ul className="nav-profile-dropdown">
                    <li>
                      <img src={assets.bag_icon} alt=''/>
                      <p>Orders</p>
                    </li>
                    <hr/>
                    <li>
                      <img onClick={logout} src={assets.logout_icon} alt=''/>
                      <p>Logout</p>
                    </li>

                   </ul>
              
              
              </div>}
           

         </div>
    </div>
  )
}

export default Navbar



{/* 
  before addinf functionality of on click move to home section of the same page like that
  <ul className="navbar-menu">
<li onClick={()=>setMenu("home")}  className= {menu==="home"?"active":""}>home</li>
<li onClick={()=>setMenu("menu")}  className={menu==="menu"?"active":""}>menu</li>
<li onClick={()=>setMenu("mobile-app")}  className={menu==="mobile-app"?"active":""}>mobile-app</li>
<li  onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</li>
</ul> */}
