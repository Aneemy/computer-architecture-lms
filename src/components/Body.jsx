import React, {useEffect, useState} from 'react';
import SumRow from "./summators/SumRow";
import './styles/main.css';
import CurrentSummator from "./summators/CurrentSummator";
const Body = (props) => {

    if(props.flag){
        return (
            <div className="body">
                <div className='container'>
                    {props.children}
                    <SumRow row={props.binary.first}/>
                    <SumRow row={props.binary.second}/>
                    <CurrentSummator curSum = {props.curSum}/>
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