import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Reset() {
    const navigate = useNavigate();
    //Hooks
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPass, setRepeatPass] = useState("");
    const [error, setError] = useState("");

    const Validate = () => {
        if(username === "" || password === "" || repeatPass === "") {
            setError("Fill all the fields");
            return false;
        }else if(password !== repeatPass){
            setError("Password must match with its combination");
            return false;
         }else if(password.length < 4 || repeatPass.length < 4){
            setError("Password must not be less than 4 digits");
            return false;
        }
        return true;
    }

    const handleReset = () => {
        const isValid = Validate();
        if(isValid) {
            let details = {
                Username: username,
                password: password
            }
            axios.post("http://localhost:4000/Reset", details)
            .then((response) => {
                setError(response.data.message);
                if(response.data.redirect === true) {
                    navigate("/");
                }
            }).catch((err) => {
                setError(err.response.data);
            })
        }
    }

    return (
        <div>
            <div class="container">
                <div class="col-sm-12" className='body_div'>
                    <h4>Our Intrests</h4>
                    <p>Reset Password:</p>
                    <input type="text" placeholder='Enter your Username'
                     onChange={(e) => {setUsername(e.target.value)}} /> <br /> <br />

                     <input type="password" placeholder= "Enter password" 
                     onChange={(e) => {setPassword(e.target.value)}} /> <br /> <br />

                     <input type="password" placeholder= "Repeat password" 
                     onChange={(e) => {setRepeatPass(e.target.value)}} /> <br /> <br />
                     
                     <p style={{color: "red"}}>{error}</p>
                     <button class="btn btn-success" onClick={handleReset}>Reset</button>
                     <br /> <br />
                     <Link to="/">Back to Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default Reset
