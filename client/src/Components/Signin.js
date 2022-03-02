import React,{useState, useEffect} from 'react'
import axios from 'axios';
import './Css/Signin.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

function Signin() {
    const navigate = useNavigate();
    //Hook  Usestates
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    useEffect(() => {
        axios.get("http://localhost:4000/Login")
        .then((response) => {
            if(response.data.loggedIn === true){
                navigate("/Home");
            }else{
                //Do Nothing
            }
        });
    })

    const validate = () => {
        if(username === "" || password === "") {
            setError("Fill all fields");
            return false;
        }else if(password.length < 4) {
            setError("Password should have more than 4 characters");
            return false;
        }
        return true;
    }
    
    //axios send cookies 
    axios.defaults.withCredentials = true;

    const handleSubmit = () => {
        //Action
        const isValid = validate();
        if(isValid) {
            let details = {
                password: password,
                username: username
            }
            axios.post("http://localhost:4000/Signin", details)
            .then((response) => {
                setError(response.data.message);
            })
            .catch((err) => {
                setError(err.response);
            })
        }
    }

    return (
        <div>
            <div class="container">
                <div class="row">
                    <div class="col-sm-12" className='body_div'>
                        <h4>Our Intrests</h4>
                        <p>Login:</p>
                    
                        <input type="text" placeholder='Enter username' 
                        onChange={(e) => {setUsername(e.target.value)}} /><br></br><br></br>

                        <input type="text" placeholder ="Enter Password" 
                        onChange={(e) => {setPassword(e.target.value)}} /><br></br>
                        <p style={{color: "red"}}>{error}</p>

                        <button onClick={handleSubmit}>Sign in</button> <br></br><br></br>
                        <p><Link to= "/Reg" style={{color: "blue"}}>Create account</Link></p>
                        <p><Link to= "/Reset" style={{color: "green"}}>Reset password</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin
