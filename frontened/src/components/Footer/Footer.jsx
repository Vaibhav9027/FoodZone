import React from 'react'

import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className="footer" id='footer'>
    <div className='footer-content'>
      <div className="footer-content-left">
        <img src={assets.logo}/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam possimus nesciunt placeat unde enim doloribus praesentium ipsa, in voluptatibus quos?</p>
        <div className="footer-social-icons">
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
          <img src={assets.linkedin_icon} alt="" />
        </div>
      </div>
      <div className="footer-content-center">
      <h2>COMPANY</h2>
      <ul>
        <li>Home</li>
        <li>About Us</li>
        <li>Delivery</li>
        <li>Privacy policy</li>
      </ul>
      </div>
      <div className="footer-content-right">
        <h2>GET IN TOUCH</h2>
        <ul>
          <li>+78525896325</li>
          <li>contact@email.com</li>
        </ul>

      </div>
      
    </div>
    <hr/>
    <p className='footer-copyright'>Cpyright 2024 @ Tomato.com- all right reserved</p>
    </div>
    
  )
}

export default Footer
