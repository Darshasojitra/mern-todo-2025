import { Link, Navigate, useNavigate } from 'react-router-dom'
// import '../style/navbar.css'
import { useEffect, useState } from 'react';

function NavBar() {
    const [login, setLogin] = useState(localStorage.getItem('login'))
    const navigate = useNavigate()
    const logout = () => {
        console.log("test");

        localStorage.removeItem('login')
        setLogin(null)
        setTimeout(() => {
            navigate('/login')
        }, 0);

    }

    useEffect(() => {
        const handleStorage = () => {
            setLogin(localStorage.getItem('login'))
        }

        window.addEventListener("localStorage-change", handleStorage)

        return () => {
            window.removeEventListener("localStorage-change", handleStorage)
        }
    }, [])



const [isOpen, setIsOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // }
      const toggleMenu = () => {
        setIsOpen(prev => !prev);
    }
    
    return (
        <nav className='navbar'>
            <div className='logo'>To Do App</div>
             <div className="menu-toggle" id="menu-toggle" onClick={toggleMenu} >
        ☰
    </div>
            
            <ul className={`nav-links ${isOpen ? "active" : ""}`}  onClick={toggleMenu} >
                
                {
                    login ? 
                        <>
                            <li  onClick={toggleMenu}><Link to="/">List</Link></li>
                         <li  onClick={toggleMenu}><Link to="/add">Add Task</Link></li>
                         <li  onClick={toggleMenu}><Link onClick={logout} >Logout</Link></li>
                        </> 
                         :  <>
                         <li  onClick={toggleMenu}><Link to="/login" >Login</Link></li>
                         <li  onClick={toggleMenu}><Link to="/signup">SignUp</Link></li>
                        </>

                 }


            </ul>
        </nav>
    )
}

export default NavBar;
