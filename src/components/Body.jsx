import React, {useEffect, useRef, useState} from 'react';
import SumRow from "./summators/SumRow";
import './styles/main.css';
import CurrentSummator from "./summators/CurrentSummator";

const Body = (props) => {
    const [sumToggle,setSumToggle]=useState(false);
    const [bodyDimensions, setBodyDimensions] = useState({width: Math.floor(1920*0.9), height: window.innerHeight});

    if(props.flag){
        return (
            <div className="body" style={{width:bodyDimensions.width}}>
                <div className='container'>
                    {props.children}
                    <div>
                        <CurrentSummator
                            sumToggle = {sumToggle}
                            sumBuffer = {props.sumBuffer}
                            sumOutPut = {props.sumOutPut}
                            curSum = {props.curSum}
                            binary = {props.binary}
                            bodyDimensions = {bodyDimensions}
                            sumResult = {props.sumResult}
                        />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div disabled={props.disabled} onClick={props.onClick} className="body">
                <div className='container'>
                    {props.children}
                </div>
            </div>
        );
    }
};

export default Body;