//Reducer Hook is used in state management
import React, {useReducer} from 'react'
import styles from './hooks.module.css';
import { Link } from 'react-router-dom';

function UseReducer() {
    const reducer = (state, action) => {
        switch(action.type) {
            case "INCREMENT": 
                return {count: state.count + 1, showText: state.showText };
            case "TOOGLETEXT": 
            return {count: state.count, showText: !state.showText}; 
            default: 
                return state;
        }  
    }
    //UseReducer Hook
    const [state, dispatch] = useReducer(reducer, {count: 0, setText: true});
    return (
        <div className= {styles.body}>
             <p><Link to = "/UseState">UseState</Link></p>
             <p><Link to = "/UseEffect">UseEffect</Link></p>
             <p><Link to = "/UseReducer">UseReducer</Link></p>

             <hr></hr>
           <h2>{state.count}</h2>

           <button onClick={() => {
               dispatch({type: "INCREMENT"});
               dispatch({type: "TOOGLETEXT"});
           }}>Increment</button>

           <h5>{state.setText && <p>Hello </p>}</h5>
        </div>
    )
}

export default UseReducer
