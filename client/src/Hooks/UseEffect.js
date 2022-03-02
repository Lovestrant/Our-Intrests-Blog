import React, { useEffect,useState } from 'react'
import axios from 'axios'
import styles from './hooks.module.css'
import {Link} from 'react-router-dom'

function UseEffect() {
    //UseState Hook
    const [data, setData] = useState("");
    //useEffect Hook
    useEffect(() => {
        axios
        .get("https://jsonplaceholder.typicode.com/comments")
        .then((response) => {
            setData(response.data[11].email); 
        });
    }, []);

    return (
        <div className= {styles.body}>
            <div class = "container">
               {data}
            </div>    
        </div>
    )
}

export default UseEffect
