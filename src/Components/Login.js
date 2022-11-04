import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [ input, setInput ] = useState({
        email: "",
        password: "",
    });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [ isAvailable, setIsAvailable ] = useState([true, true]);

    const handleSearchCredential = () => {
        const loggedUser = JSON.parse(localStorage.getItem("users"));
        let found = false;

        // Loop through all the users in localStorage then set true each time it satisfies the requirement
        loggedUser.forEach(user => {
            console.log("User: ", user);
            console.log("Inpute Email: ", input.email);
            console.log("Inpute Password: ", input.password);
            console.log("Bool?", user.email === input.email && user.password === input.password)
            if(user.email === input.email) {
                found = true;
                setIsAvailable([true, false])
                if (user.password === input.password) {
                    localStorage.setItem("loggedIn", true);
                    setIsAvailable([true, true])
                }
            } else {
                return isAvailable;
            }
        })

        if(!found)
            setIsAvailable([false, true]);

        return found;
    }
    
    // Function that handles user login
    const handleLogin = (e) => {
        e.preventDefault();
        const loggedUser = JSON.parse(localStorage.getItem("users"));
        console.log(loggedUser);
        console.log("CHECK: ", handleSearchCredential());
        
        if( input.email === ""){
            setEmailError("Email is required")
            //emailRef.current.classList.add("error")
        }
        if( input.password === ""){
            setPasswordError("Password is required")
            //passRef.current.classList.add("error")
        }
        if ( handleSearchCredential() ) {
            navigate("/dashboard")
        } else {
            setLoginError("Invalid email/password")
        }
    }
    return (
        <div>
        <form onSubmit={handleLogin} className='login-container' noValidate> 
            <input 
                name="email"
                type="email" 
                value={input.email}
                placeholder='Email' 
                className="input" 
                onChange={(e) => {
                    setInput({
                        ...input,
                        [e.target.name]: e.target.value,
                    })
                }}
            />
            <span className="errorMsg">{emailError}</span>
            <input 
                name="password"
                type="password" 
                value={input.password}
                placeholder='Password' 
                className="input" 
                onChange={(e) => {
                    setInput({
                        ...input,
                        [e.target.name]: e.target.value,
                    })
                }}
            />
            {/* <span className="errorMsg">{passError}</span> */}
            <span className="errorMsg">{loginError}</span>
            <button type="submit" className="btn">Login</button>  
        </form>
        </div>
    )
}

export default Login;