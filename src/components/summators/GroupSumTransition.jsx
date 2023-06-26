import React, {useState} from 'react';
import {CSSTransition} from "react-transition-group";
import GroupSumItem from "./GroupSumItem";

const GroupSumTransition = (props) => {
    const transitionTime = props.time*0.6/props.unitedArray.length;
    const [transitionIt,setTransitionIt] = useState(0);

    function handleIteration(){
        setTransitionIt(transitionIt + 1);
        if(transitionIt===props.unitedArray.length-1){
            props.setTrigger(true)
        }
    }
    return (
        <div className="groupsum__transition">
            {props.unitedArray.filter((item,index)=>index<=8)
                .map((filterednumber,index) => (
                    <CSSTransition
                        key = {index}
                        in = {props.sumToggle&&index<=transitionIt}
                        timeout = {{appear:0,
                            enter:(transitionTime)}}
                        onEntered = {()=>handleIteration()}>
                        <GroupSumItem key = {index} keyValue = {index} gsiH = {props.gsi__height} gsiW = {props.gsi__width} time = {transitionTime}>
                            {filterednumber}
                        </GroupSumItem>
                    </CSSTransition>
                ))
            }
        </div>
    );
};

export default GroupSumTransition;