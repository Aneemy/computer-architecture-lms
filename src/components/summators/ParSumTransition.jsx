import React, {useEffect, useState} from 'react';
import ParSumItem from "./ParSumItem";
import {CSSTransition} from "react-transition-group";

const ParSumTransition = (props) => {
    const transitionTime = (props.time)/(props.keyValue*2);
    const [transitionIt,setTransitionIt] = useState(0);
    const [transitionArray,setTransitionArray] = useState(props.unitedArray .filter((number, index,array) => index >=props.unitedArray.length-(props.keyValue)*2))

    function handleIteration(){
        setTransitionIt(transitionIt + 1);
    }
    return (
        <div className="parsum__transition" style={{width:`${(props.keyValue*2)*props.psi__width*1.7}px`,left:(props.psi__width)*5.2}}>
            {transitionArray.filter((item,index)=>index<=8)
                .map((filterednumber,index,array) => (
                    <CSSTransition
                        key = {index}
                    in = {props.sumToggle&&index<=transitionIt}
                    timeout = {{appear:0,
                                enter:transitionTime}}
                    onEntered = {()=>handleIteration()}>
                    <ParSumItem key = {index} keyValue = {index} psiH = {props.psi__height} psiW = {props.psi__width} time = {transitionTime}>
                        {filterednumber}
                    </ParSumItem>
                    </CSSTransition>
                ))
            }
        </div>
    );
};

export default ParSumTransition;