import React, { useState } from 'react'
import "./Register.css"
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

function Register() {

    const navigate = useNavigate();

    const {setAuthUser} = useAuthContext();
    const url = process.env.REACT_APP_BASE_URL;

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
    })

    async function registerUser(e) {
        e.preventDefault();

        const {name, email, password, gender} = inputs;

        if (!name || !email || !password || !gender) {
            toast.error("Please fill all the fields");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be 6 characters long");
            return;
        }

        try {
            
            const result = await axios.post(`${url}/api/auth/signup`, {name, email, password, gender});
            if (result) {
                console.log(result.data);
                toast.success("Successfully registered");
                navigate("/");
            } else {
                return;
            }
                    // .then(result => {
                    //     console.log(result.data);
                    //     // localStorage.setItem("chat-user", JSON.stringify(result.data));
                    //     // setAuthUser(result.data);
                    //     toast.success("Succesfully registered!");
                    //     navigate("/");

                    // });

        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    }

    return (
        <div className='register'>
            <h1 style={{marginBottom: "20px"}}>Create new Account</h1>
            <form action="">
                <input type="text" name='name' placeholder='Enter Name' value={inputs.name} onChange={e => {setInputs({...inputs, name: e.target.value})}} />
                <input type="text" name='email' placeholder='Enter Email' value={inputs.email} onChange={e => {setInputs({...inputs, email: e.target.value})}} />
                <input type="password" name='password' placeholder='Enter Password' value={inputs.password} onChange={e => {setInputs({...inputs, password: e.target.value})}} />
                <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{display: "flex", alignItems: "center", width: "100px"}}>
                        <input type="checkbox" name='male' style={{width: "fit-content", borderRadius: "100px"}} onChange={e => {setInputs({...inputs, gender: "male"})}} checked={inputs.gender === "male"} />
                        <label for="male">Male</label>
                    </div>
                    <div style={{display: "flex", alignItems: "center", width: "100px"}}>
                        <input type="checkbox" name='female' style={{width: "fit-content"}} onChange={e => {setInputs({...inputs, gender: "female"})}} checked={inputs.gender === "female"} />
                        <label for="female">Female</label>
                    </div>
                </div>
                <button type='submit' onClick={registerUser}>Register</button>
            </form>
        </div>
    )
}

export default Register