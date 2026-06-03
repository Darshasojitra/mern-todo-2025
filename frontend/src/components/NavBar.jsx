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
    const handleLinkClick = () => {
    setIsOpen(false);
};
    
    return (
        <nav className='navbar'>
            <div className='logo'>To Do App</div>
             <div className="menu-toggle" id="menu-toggle" onClick={toggleMenu} >
        ☰
    </div>
            
            <ul className={`nav-links ${isOpen ? "active" : ""}`}>
                
                {
                    login ? 
                        <>
                            <li ><Link to="/"  onClick={handleLinkClick}>List</Link></li>
                         <li ><Link to="/add"  onClick={handleLinkClick}>Add Task</Link></li>
                         <li ><Link onClick={() => { logout(); handleLinkClick(); }} >Logout</Link></li>
                              {/* onClick={logout} */}
                        </> 
                         :  <>
                         <li><Link to="/login"  onClick={handleLinkClick}>Login</Link></li>
                         <li><Link to="/signup"  onClick={handleLinkClick}>SignUp</Link></li>
                        </>

                 }


            </ul>
        </nav>
    )
}

export default NavBar;
