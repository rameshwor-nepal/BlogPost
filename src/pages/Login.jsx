import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebaseSetup/firebase'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Login = () => {

  const[email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();


   const handleLogin = () =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCred)=>{
        console.log(userCred.user)
        navigate('/')
    })
    .catch((err) => alert(err.message))

    }

  return (
    <div className='login-register-page'>
        <section className = "login-register-section">
          <h1 className='login-register-title'>Login Here</h1>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email here' />
            <input type="password" name="password" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder='Enter password here' />

            <button onClick={handleLogin} className='login-btn'>  Login </button>
            <Link to={'/register'} > 
                <button className= "login-btn-register">Click to Register</button>
            </Link>

        </section>
    </div>
  )
}

export default Login