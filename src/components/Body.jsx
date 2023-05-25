import React, {useEffect, useRef, useState} from 'react';
import SumRow from "./summators/SumRow";
import './styles/main.css';
import CurrentSummator from "./summators/CurrentSummator";

const Body = (props) => {
    const [sumToggle,setSumToggle]=useState(false);
    const [bodyDimensions, setBodyDimensions] = useState({width: 0, height: 0});

    const bodyRef = useRef(null);

    useEffect(() => {
        if (bodyRef.current) {
            setBodyDimensions({
                width: bodyRef.current.offsetWidth,
                height: bodyRef.current.offsetHeight,
            });
            console.log(bodyRef.current.offsetWidth,bodyRef.current.offsetHeight)
        }
    }, [bodyRef.current]);


    if(props.flag){
        return (
            <div className="body" ref={bodyRef}>
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
                        />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="body" ref={bodyRef}>
                <div className='container'>
                    {props.children}
                </div>
            </div>
        );
    }
};

export default Body;