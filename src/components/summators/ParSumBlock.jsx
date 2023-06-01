import React, {useState} from 'react';
import {CSSTransition} from "react-transition-group";
import ParSumItem from "./ParSumItem";
import ParSumTransition from "./ParSumTransition";

const ParSumBlock = (props) => {
    let balance;
    const ParTop1 = props.cursum.links[0]
    const ParTop2 = props.cursum.links[2]
    const ParSum = props.cursum.links[1]
    const psi__width = Math.floor(props.width/10);
    const psi__height = Math.floor(props.width/11);
    const [go,setGo] = useState(false);
    props.sumOutPut.length-props.sumBuffer.length===1 ? balance = 1 : balance = 0;
    function calcParSumItemDimensions(array){
        let result = (props.width/array.length-1)*0.9
        if (result > psi__width)
            return psi__width
        else
            return result
    }

    return (
            <div className='parsum__block'>
            <ParSumTransition
                time = {props.time}
                keyValue = {props.keyValue}
                unitedArray = {props.unitedArray}
                psi__width = {psi__width}
                psi__height = {psi__height}
                sumToggle = {props.sumToggle}
            />
            <div className="parsum__sum" style = {{width:`${props.width}px`,'--psi__height':psi__height}}>
                <div className="parsum__sum-top">
            <ParTop1 style = {{width:`${props.width/4}px`}}/>
            <ParTop2 style = {{width:`${props.width/4}px`}}/>
                </div>
            <ParSum style = {{width:`${props.width}px`}}/>
                <div className="parsum__items">
            <CSSTransition
            timeout = {props.time}
            in = {go&&props.sumToggle}
            appear
            onEntered = {()=>{
                if(props.keyValue === props.binary.first.length-1)
                    props.changeShowResult(true)
            }}>
                <ParSumItem  time = {props.time} psiH = {psi__height} psiW = {psi__width}>
                    {props.sumOutPut[props.sumOutPut.length-1-props.keyValue-balance]}
                </ParSumItem>
            </CSSTransition>
            <CSSTransition
                timeout = {props.time}
                in = {props.sumToggle}
                appear>
                <ParSumItem time = {props.time} psiH = {psi__height} psiW = {psi__width}>
                    {props.binary.first[props.sumOutPut.length-1-props.keyValue-balance]}
                </ParSumItem>
            </CSSTransition>
            <CSSTransition
                timeout = {props.time}
                in = {props.sumToggle}
                appear
                onEntered = {()=>setGo(true)}>
                <ParSumItem time = {props.time} psiH = {psi__height} psiW = {psi__width}>
                    {props.binary.second[props.sumOutPut.length-1-props.keyValue-balance]}
                </ParSumItem>
            </CSSTransition>
                </div>
            </div>
        </div>
    );
};

export default ParSumBlock;