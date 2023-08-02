import React from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseSetup/firebase';
import logo from '../assets/logo.png'

const Navbar = () => {
  const navigate = useNavigate();
  // const { user } = useAuthState(auth)
  const user = auth.currentUser

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login')
      })
      .catch((error) => alert(error.message));
  };

  return (
    <header className='header'>
     <Link to={'/'}>  <img src= {logo} alt="logo" className='header-logo' /> </Link>
      <nav className='navbar'>
        <Link to={'/'}> <p className='navbar-home'>Home</p></Link>
        <Link to={'/about'}>  <p className='navbar-about'> About</p> </Link>
       { user ? 
       (<Link to={'/create'}> <p className='navbar-create'>Create blogs</p> </Link>
       ) :( <Link to={'/error'}><p className='navbar-create'> Create blogs</p></Link> 
       )} 
        <Link to={'/'}> <p className='navbar-allblogs'>All Blogs</p> </Link>
        <Link to={'/contact'}> <p className='navbar-contact'>Contact</p> </Link>
      </nav>
      <div>
        {user ? (
          <div className='welcome-user-div'>
            <p> welcome {user.displayName}</p>
            <button onClick={handleSignout} className='navbar-signout' >Sign Out</button>
            </div>
        ) : (          
          <Link to={'/login'}> <button className='navbar-login'>Sign In</button></Link>
        )}



      </div>
    </header>
  )
}

export default Navbar