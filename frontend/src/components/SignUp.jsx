import { useState } from 'react'
import '../style/addtask.css'
import { Link } from 'react-router-dom'
 export default function SignUp(){

    const [userData,setUserData]=useState()
    return(
        <div className="container">
            <h1>Sign Up</h1>
            
                <label htmlFor="">Name</label>
                <input 
                onChange={(event)=>setUserData({...userData,name:event.target.value})} 

                type="text" name="name" placeholder="Enter user name "/>

                <label htmlFor="">Email</label>
                <input 
                onChange={(event)=>setUserData({...userData,email:event.target.value})} 
                type="text" name="email" placeholder="Enter user email "/>

                <label htmlFor="">Password</label>
                <input 
                onChange={(event)=>setUserData({...userData,password:event.target.value})} 
                type="text" name="password" placeholder="Enter user password "/>
           <button onClick={()=>console.log(userData)} className="submit">Sign up</button>
           <Link className='link' to="/login">Login</Link>
            
        </div>
    )
}

