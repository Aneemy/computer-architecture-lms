import React, {useEffect, useState} from 'react';
import SumRow from "./summators/SumRow";
import './styles/main.css';
import CurrentSummator from "./summators/CurrentSummator";
import {TransitionGroup} from "react-transition-group";
const Body = (props) => {
const [sumToggle,setSumToggle]=useState(false);
    if(props.flag){
        return (
            <div className="body">
                <div className='container'>
                    {props.children}
                    <div>
                        <CurrentSummator curSum = {props.curSum}/>
                            <div style={{display:"flex"}}>
                                <SumRow on = {sumToggle} row={props.binary.first}/>
                                <SumRow on = {sumToggle} row={props.binary.second}/>
                            </div>
                        <button  onClick={()=> setSumToggle(!sumToggle)} style={{float:"right"}}>Включить</button>
                    </div>
                </div>
            </div>
        )
    }
    else
    return (
        <div className="body">
            <div className='container'>
                {props.children}
            </div>
        </div>
    );
};

export default Body;