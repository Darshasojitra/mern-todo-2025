import { useState } from 'react'
import '../style/addtask.css'
import { Link } from 'react-router-dom'
 export default function Login(){

    const [userData,setUserData]=useState()
    return(
        <div className="container">
            <h1>Login</h1>

                <label htmlFor="">Email</label>
                <input 
                onChange={(event)=>setUserData({...userData,email:event.target.value})} 
                type="text" name="email" placeholder="Enter user email "/>

                <label htmlFor="">Password</label>
                <input 
                onChange={(event)=>setUserData({...userData,password:event.target.value})} 
                type="text" name="password" placeholder="Enter user password "/>
           <button onClick={()=>console.log(userData)} className="submit">Login</button>
           <Link className='link' to="/signup">Sign up</Link>
            
        </div>
    )
}

