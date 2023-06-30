import React, {useState} from 'react';
import GroupSumItem from "./GroupSumItem";
import {CSSTransition} from "react-transition-group";

const GroupSumElem = (props) => {
    let GroupSummator;
    const [goResult,setGoResult] = useState(false);
    // const [goBuffer,setGoBuffer] = useState(false)
    console.log(props.cursum.links)

        if (props.keyValue===0)
            GroupSummator = props.cursum.links[0]
        else
            GroupSummator = props.cursum.links[1]
        if(props.isLast)
        GroupSummator = props.cursum.links[2]

    function TransBuffer (){
        if (props.keyValue === 0 && (!props.isFirst)&&!props.isLast)
            return (
                <CSSTransition
                    timeout={{appear:props.time*0.4,
                        enter:0}}
                    in = {props.trigger&&!goResult}
                    appear
                >
                    <GroupSumItem time = {props.time*0.4} gsiW = {props.gsi__width} gsiH = {props.gsi__height}>
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
                timeout = {props.time}
                onEntered = {()=>{
                    if (props.isLast&&props.keyValue===props.binary.first.length-1)
                        props.changeShowResult(true)
                }
                }>
                    <GroupSumItem time = {props.time} gsiW = {props.gsi__width} gsiH = {props.gsi__height}>
                        {props.result[props.binary.first.length-1-props.keyValue]}
                    </GroupSumItem>
                </CSSTransition>
                <CSSTransition
                    timeout={props.time}
                    in = {props.sumToggle&&props.keyValue===props.curIterable}
                    appear>
                    <GroupSumItem time = {props.time} gsiW = {props.gsi__width} gsiH = {props.gsi__height}>
                        {props.binary.first[props.binary.first.length-1-props.keyValue]}
                    </GroupSumItem>
                </CSSTransition>
                <CSSTransition
                    timeout={props.time}
                    in = {props.sumToggle&&props.keyValue===props.curIterable}
                    appear
                    onEntered = {()=>{setGoResult(true);
                        props.handleIterable(props.curIterable+1)}}>
                    <GroupSumItem time = {props.time} gsiW = {props.gsi__width} gsiH = {props.gsi__height}>
                        {props.binary.second[props.binary.first.length-1-props.keyValue]}
                    </GroupSumItem>
                </CSSTransition>
            <CSSTransition
                timeout={props.time}
                in = {goResult&&!props.isLast}
                appear>
                <GroupSumItem time = {props.time} gsiW = {props.gsi__width} gsiH = {props.gsi__height}>
                    {props.sumBuffer[props.binary.first.length-1-props.keyValue]}
                </GroupSumItem>
            </CSSTransition>
                <TransBuffer/>
        </div>
    );
};

export default GroupSumElem;