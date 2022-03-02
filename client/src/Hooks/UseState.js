import React, {useState} from 'react'
import styles from './hooks.module.css';

function UseState() {
    //Hook
    const [output, setOutput] = useState(0);
    const [text, setText] = useState("");
    const handleClick = () => {
        setOutput(output + 1);
    }
    return (
        <div className= {styles.body}>
            <input type="text" placeholder="Enter text" onChange = {(e) => {setText(e.target.value)}}/> <b></b>
            <p><label>Text = </label>{text}</p>
            <button onClick={handleClick}>Click here</button>
            <p><label>Output = </label>{output}</p>
        </div>
    )
}

export default UseState
