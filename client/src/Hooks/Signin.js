import React, { useState } from 'react';
import axios from 'axios';

function Signin() {

    //Hook  Usestates
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const validate = () => {
        if(username === "" || password === "") {
            setError("Field all fields");
            return false;
        }else if(password.length < 4) {
            setError("Password should have more than 4 characters");
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        //Action
        const isValid = validate();
        if(isValid) {
            let details = {
                password: password,
                username: username
            }
            axios.post("http://localhost:5000/Signin", details)
            .then((response) => {
                setError(response.data.message);
            })
            .catch((err) => {
                setError(err.data.message);
            })
        }
    }
    return (
        <div>
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <h4>Our Intrests</h4>
                        <p>Login:</p>
                    </div>
                    <div class="col-sm-6">
                        <input type="text" placeholder='="Enter username' 
                        onChange={(e) => {setUsername(e.target.value)}}/><br></br>

                        <input type="text" placeholder ="Enter Password" 
                        onChange={(e) => {setPassword(e.target.value)}}/><br></br>
                        <p style={{color: "red"}}>{error}</p>

                        <input type="submit" onChange={handleSubmit}>Sign in</input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin
