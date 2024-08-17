import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const {authUser, setAuthUser} = useAuthContext();
    const url = process.env.REACT_APP_BASE_URL;
    axios.defaults.withCredentials = true;

    async function loginUser(e) {
        e.preventDefault();

        try {
            await axios.post(`${url}/api/auth/login`, {email, password}, {withCredentials: true})
                    .then(result => {
                        localStorage.setItem("chat-user", JSON.stringify(result.data));
                        setAuthUser(result.data);
                        toast.success("Login Successfull!");
                        navigate("/home");
                    })
        } catch (error) {
            alert("Invalid Credentials");
            console.log(error);
        }
    }

    return (
        <div className='login'>
            <h1 style={{marginBottom: "20px"}}>Existing User... Login</h1>
            <form action="">
                <input type="text" name='email' placeholder='Enter Email' onChange={e => {setEmail(e.target.value)}} />
                <input type="password" name='password' placeholder='Enter Password' onChange={e => {setPassword(e.target.value)}} />
                <button type='submit' onClick={loginUser}>Login</button>
            </form>
            <p style={{marginTop: "20px"}}>New User? <a href="/register">Register with Whatsssapp</a></p>
        </div>
    )
}

export default Login
