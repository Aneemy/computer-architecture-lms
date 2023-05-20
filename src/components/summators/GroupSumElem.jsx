import React, {useState} from 'react';
import GroupSumItem from "./GroupSumItem";
import {CSSTransition} from "react-transition-group";

const GroupSumElem = (props) => {
    console.log(props.gsi__width,props.gsi__height)
    const GroupSummator = props.keyValue===0 ? props.cursum.links[0] :props.cursum.links[1];
    const [goResult,setGoResult] = useState(false);
    // const [goBuffer,setGoBuffer] = useState(false)
    function TransBuffer (){
        if (props.keyValue === 0 && (!props.isFirst)&&!props.isLast)
            return (
                <CSSTransition
                    timeout={{appear:500,
                        enter:0}}
                    in = {props.trigger&&!goResult}
                    appear
                >
                    <GroupSumItem gsiW = {props.gsi__width} gsiH = {props.gsi__height}>
                        {props.tBuf}
                    </GroupSumItem>
                </CSSTransition>
            )
        else return undefined
    }
    return (
        <div className="groupsum__elem">
            <GroupSummator style = {{width:`${props.width}px`}}/>
                <CSSTransition
                in = {goResult}
                appear
                timeout = {2500}
                >
                    <GroupSumItem gsiW = {props.gsi__width} gsiH = {props.gsi__height}>
                        {props.result[props.binary.first.length-1-props.keyValue]}
                    </GroupSumItem>
                </CSSTransition>
                <CSSTransition
                    timeout={2500}
                    in = {props.sumToggle&&props.keyValue===props.curIterable}
                    appear>
                    <GroupSumItem gsiW = {props.gsi__width} gsiH = {props.gsi__height}>
                        {props.binary.first[props.binary.first.length-1-props.keyValue]}
                    </GroupSumItem>
                </CSSTransition>
                <CSSTransition
                    timeout={2500}
                    in = {props.sumToggle&&props.keyValue===props.curIterable}
                    appear
                    onEntered = {()=>{setGoResult(true);
                        props.handleIterable(props.curIterable+1)}}>
                    <GroupSumItem gsiW = {props.gsi__width} gsiH = {props.gsi__height}>
                        {props.binary.second[props.binary.first.length-1-props.keyValue]}
                    </GroupSumItem>
                </CSSTransition>
            <CSSTransition
                timeout={2500}
                in = {goResult&&!props.isLast}
                appear>
                <GroupSumItem gsiW = {props.gsi__width} gsiH = {props.gsi__height}>
                    {props.sumBuffer[props.binary.first.length-1-props.keyValue]}
                </GroupSumItem>
            </CSSTransition>
                <TransBuffer/>
        </div>
    );
};

export default GroupSumElem;