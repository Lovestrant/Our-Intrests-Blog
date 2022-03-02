import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Header from './Header';
import './Css/Home.css'

function Home() {
    const navigate = useNavigate();

    //axios send cookies 
    axios.defaults.withCredentials = true;

    //useState Hook
    const [user, setUser] = useState("");
    const [textPost, setTextPost] = useState("");
    const [error, setError] = useState("");
    const [image, setImage] = useState("");

    //useEffect to check if user is logged in or not
    useEffect(() => {
        axios.get("http://localhost:4000/Login").then((response) => {
            if(response.data.loggedIn === true) {
                setUser(response.data.user);
            }else {
                // alert("session expired: Login again");
                // navigate("/");
            }
        })
    })
    const validatePost = ()=> {
        if(textPost ===""){
            setError("Type something to post");
            return false;
        }
        return true;
    }

    const handlePost = () => {
        const checkPost = validatePost();
        if(checkPost) {
            
            if(image == null) {
                axios.post("http://localhost:4000/postText", textPost)
                .then((response) => {
                    if(response.data.postStatus === true) {
                        setError("Post success");
                    }
                })
                .catch((error) => {
                    if(error.response.message) {
                        setError(error.response.message);
                    }
                });
            }else{
                //Post with Image

            }
               

            }
            
        
    }

    //logout
    const handleLogout = () => {
          axios.post("http://localhost:4000/Logout").then((response) => {
           if(response.data.status === true) {
                navigate("/");
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div>
            <Header />
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-6" className='postDiv'>
                        <p style={{color: "red"}}>{error}</p>
                        <input type="text" onChange={(e) => {
                            setTextPost(e.target.value)
                        }} placeholder="What's your intrest?" className="postInput" />
                        <br /> 
                        
                        <label>Attach Image
                        <input type="file" onChange={(e) => {
                            setImage(e.target.value)}} className='file' accept='image/*' />
                        </label>
                      
                        <button onClick={handlePost} class="btn btn-success" className='btn'>Post</button> 
                    </div>

                    <div class="col-sm-6" className='displayDiv'>

                    </div>

                </div>

                <div class="row">
                        <div class="col-sm-12" className='lowerDiv'>
                        hello <h1>{user}</h1>
                        <p>
                            <button onClick={handleLogout}>Log Out</button>
                        </p>
                        </div>
                </div>
            </div>
            
        </div>
    )
}

export default Home
