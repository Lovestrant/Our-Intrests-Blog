import React,{ useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

function Reg() {
//Hooks
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [passConfirm, setPassConfirm] = useState("");

//form validation
const validate = () => {
    if(username==="" || password==="" || passConfirm==="") {
        setError("Fill all fields");
        return false;
    }else if(passConfirm !== password) {
        setError("Password must match with its confirmation");
        return false;
    }else if(password.length < 4){
        setError("Password not be less than 4 characters");
        return false;
    }
    return true;
}

//handle submit
const handleSubmit = () => {
    const isValid = validate();
    if(isValid) {
        let details = {
            username: username,
            password: password  
        }
        axios.post("http://localhost:4000/Signup", details)
        .then((response) => {
            setError(response.data);
        }).catch((err) => {
            setError(err.response.data);
        })
    }
}

    return (
        <div>
            <div class="container" className="body_div">
                <div class="col-sm-12">
                    <h3>Our Intrests</h3>
                    <h5>Sign Up:</h5>
                    <input type ="text" placeholder = "Set Username"
                     onChange={(e) => {setUsername(e.target.value)}} /> <br></br> <br></br>
                    <input type ="password" placeholder = "Set Password" 
                     onChange={(e) => {setPassword(e.target.value)}} /> <br></br> <br></br>
                    <input type ="Password" placeholder = "Repeat Password"
                     onChange={(e) => {setPassConfirm(e.target.value)}} /> <br></br> <br></br>
                    
                    <p id="err" style={{color: "red"}}>{error}</p>
                    <button onClick={handleSubmit}>Sign Up</button>
                    <br /> <br />
                    <Link to="/">Back to Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default Reg
