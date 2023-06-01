import React, {useEffect, useState} from 'react';
import {CSSTransition, Transition} from "react-transition-group";
import MultiSumItem from "./MultiSumItem";

const MultiSumBlock = (props) => {
    let MulSum;
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
            MulSum = props.cursum.links[0]
            break
        case props.binary.first.length-1:
            MulSum = props.cursum.links[2]
            lastbuffer = true;
            break
        default:
            MulSum = props.cursum.links[1]
    }
    return (
        <div className="multisum__block">
            <MulSum style = {{width:`${props.width}px`}}/>
            <CSSTransition
                timeout = {props.time}
                in = {go&&props.sumToggle}
                appear
                onEntered = {()=>{
                    if (props.keyValue===props.binary.first.length-1){
                        props.changeShowResult(true)
                        }
                    props.changeMsIteration(props.msIteration+1)
                }}>
                <MultiSumItem time = {props.time}  msiH = {msi__height} msiW = {msi__width}>
                    {props.sumOutPut[props.sumOutPut.length-1-props.keyValue]}
                </MultiSumItem>
            </CSSTransition>
            <CSSTransition
                timeout = {props.time*2}
                in = {go&&!(!balance&&last)&&!lastbuffer&&props.sumToggle}
                appear
                >
                <MultiSumItem time = {props.time}  msiH = {msi__height} msiW = {msi__width}>
                    {props.sumBuffer[props.keyValue]}
                </MultiSumItem>
            </CSSTransition>
            <CSSTransition
                key = {k}
                timeout = {props.time}
                in = {props.sumToggle&&props.keyValue===props.msIteration}
                appear
            >
                <MultiSumItem time = {props.time} msiH = {msi__height} msiW = {msi__width}>
                    {props.binary.first[props.sumOutPut.length-1-props.keyValue-balance]}
                </MultiSumItem>
            </CSSTransition>
            <CSSTransition
                key = {k+2}
                timeout = {props.time}
                in = {props.sumToggle&&props.keyValue===props.msIteration}
                appear
                onEntered = {()=>setGo(true)}>
                <MultiSumItem time = {props.time} msiH = {msi__height} msiW = {msi__width}>
                    {props.binary.second[props.sumOutPut.length-1-props.keyValue-balance]}
                </MultiSumItem>
            </CSSTransition>
        </div>
    );
};

export default MultiSumBlock;