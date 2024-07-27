import React, {  useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

  const {url, setToken} = useContext(StoreContext)

   
  const [currState,setCurrState] =useState("Login")

   //↓--too add login register functionality↓
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
   })
   
   const onChangeHandler = (event) => {
    //extract the value
    const name = event.target.name;
    const value = event.target.value;
    //set the value
    setData(data=>({...data,[name]:value}))
   }
   // too check

  //  useEffect(()=>{
  //    console.log(data);
  //  },[data])


   const onLogin= async (event) => {
    //attaching this with form tag
    event.preventDefault()
    //to call api we need axios support in frontened
    let newUrl = url;
    if(currState=="Login"){
      newUrl += "/api/user/login"//appending the api if new user is login then new url will be /api/user/login
    }
    else{
      newUrl += "/api/user/register"  
    }
    const response = await axios.post(newUrl,data);
    //since both login aand register are post so axios is also post-- i the user is registered it will hit login api otherwise signup api
    if(response.data.success){// it means we have logged in or registeeresd-- when api will response with success true 
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false)//after successful login hide the loginpage

    }
    else{
      alert(response.data.message) 
    }
  }

     //↑--too add login register functionality using backened-↑         ←→↖↑↓



  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt='' />
        </div>
        <div className="login-popup-inputs">
          {/* hide the name field when login */}
          {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' required/>}
          {/* <input type='text' placeholder='Your Name' required/> */}
          <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your Email' required/>
          <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='password' required/>


        </div>
        <button type ="submit">{   currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
          <input type='checkbox' required/>
          <p>I agree to terms and policies</p>
        </div>

        {currState==="Login"?<p>Create a new account?<span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>: <p>Already hvae an account?<span onClick={()=>setCurrState("Login")}>Login Here</span></p>}
        
       


      </form>
    </div>
  )
}

export default LoginPopup
