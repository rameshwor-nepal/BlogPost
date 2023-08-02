import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseSetup/firebase'
import { useNavigate, Link } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
const Register = () => {

    const [register, setRegister] = useState({
        email:'',
        password:'',
        confirmPassword:'',
        displayName: ''
    })

    const navigate = useNavigate();

    const handleRegister = () =>{
        if(register.password !== register.confirmPassword){
            alert('Confirm your password are matched')
        }
        else{
            createUserWithEmailAndPassword(auth, register.email, register.password)
            .then(() =>{
                updateProfile(auth.currentUser,{
                    displayName: register.displayName,  
                  })

                  navigate('/login')
            })
            .catch((err) => err.message)
        }
        
    }

  return (
    <div className='login-register-page'>
        
        <section className='login-register-section'>
            <h1 className='login-register-title'>Register Your account</h1>
            <input type="email" placeholder='Enter your email here' name='email' value={register.email} onChange={(e) => setRegister({...register, email:e.target.value})}  />
            <input type="password" placeholder='Enter your password here' name='password' value={register.password} onChange={(e) => setRegister({...register, password:e.target.value})}  />
            <input type="password" placeholder='Confirm your password here' name='confirm-password' value={register.confirmPassword} onChange={(e) => setRegister({...register, confirmPassword:e.target.value})} />
            <input type='text' className='register-input' placeholder='Enter username' value={register.displayName} onChange={(e) => setRegister({ ...register, displayName: e.target.value })} />

            <button onClick={handleRegister} className='register-btn'>Register</button>  
            <Link to={'/login'} > 
                <button className= "login-btn-register">Click to Login</button>
            </Link> 
        </section>

    </div>
  )
}

export default Register