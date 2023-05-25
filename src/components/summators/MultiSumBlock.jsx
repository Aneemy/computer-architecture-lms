import React, {useEffect, useState} from 'react';
import {CSSTransition, Transition} from "react-transition-group";
import MultiSumItem from "./MultiSumItem";

const MultiSumBlock = (props) => {
    let Summator;
    let balance;
    let last;
    let lastbuffer = false;
    const msi__width = Math.floor(props.width/10);
    const msi__height = Math.floor(props.width/11);
    const [go,setGo] = useState(false);
    props.sumOutPut.length-props.sumBuffer.length===1 ? balance = 1 : balance = 0;
    props.sumOutPut.length-1-props.keyValue===0 ? last = true : last = false;
    const [k,setK] = useState(1)
    useEffect(()=>{
        if(!props.sumToggle) {
            setGo(false)
            setK(k+1)
        }
    },[props.sumToggle])

    switch (props.keyValue){
        case 0:
            Summator = props.cursum.links[0]
            break
        case props.binary.first.length-1:
            Summator = props.cursum.links[2]
            lastbuffer = true;
            break
        default:
            Summator = props.cursum.links[1]
    }
    return (
        <div className="multisum__block">
            <Summator style = {{width:`${props.width}px`}}/>
            <CSSTransition
                timeout = {1000}
                in = {go&&props.sumToggle}
                appear
                onEntered = {()=>props.changeMsIteration(props.msIteration+1)}>
                <MultiSumItem msiH = {msi__height} msiW = {msi__width}>
                    {props.sumOutPut[props.sumOutPut.length-1-props.keyValue]}
                </MultiSumItem>
            </CSSTransition>
            <CSSTransition
                timeout = {2000}
                in = {go&&!(!balance&&last)&&!lastbuffer&&props.sumToggle}
                appear
                >
                <MultiSumItem msiH = {msi__height} msiW = {msi__width}>
                    {props.sumBuffer[props.keyValue]}
                </MultiSumItem>
            </CSSTransition>
            <CSSTransition
                key = {k}
                timeout = {1000}
                in = {props.sumToggle&&props.keyValue===props.msIteration}
                appear
            >
                <MultiSumItem msiH = {msi__height} msiW = {msi__width}>
                    {props.binary.first[props.sumOutPut.length-1-props.keyValue-balance]}
                </MultiSumItem>
            </CSSTransition>
            <CSSTransition
                key = {k+2}
                timeout = {1000}
                in = {props.sumToggle&&props.keyValue===props.msIteration}
                appear
                onEntered = {()=>setGo(true)}>
                <MultiSumItem msiH = {msi__height} msiW = {msi__width}>
                    {props.binary.second[props.sumOutPut.length-1-props.keyValue-balance]}
                </MultiSumItem>
            </CSSTransition>
        </div>
    );
};

export default MultiSumBlock;