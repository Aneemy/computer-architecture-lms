import React, {useState} from 'react';
import {CSSTransition} from "react-transition-group";
import ParSumItem from "./ParSumItem";
import MultiSumItem from "./MultiSumItem";

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
        <div className='parsum__block' >
            <div className="parsum__transition" style = {{width:`${props.width}px`}}>
                {props.unitedArray
                    .filter((number, index,array) => index < props.keyValue*2)
                    .map((filterednumber,index,array) => (
                        <ParSumItem key = {index} psiH = {psi__height} psiW = {psi__width}>
                            {filterednumber}
                        </ParSumItem>
                    ))
                }
            </div>
            <div className="parsum__sum" style = {{width:`${props.width}px`}}>
                <div>
            <ParTop1 style = {{width:`${props.width/4}px`}}/>
            <ParTop2 style = {{width:`${props.width/4}px`}}/>
                </div>
            <ParSum style = {{width:`${props.width}px`}}/>
            </div>
            <CSSTransition
            timeout = {1000}
            in = {go}
            appear>
                <ParSumItem psiH = {psi__height} psiW = {psi__width}>
                    {props.sumOutPut[props.sumOutPut.length-1-props.keyValue-balance]}
                </ParSumItem>
            </CSSTransition>


            <CSSTransition
                timeout = {1000}
                in = {props.sumToggle}
                appear>
                <ParSumItem psiH = {psi__height} psiW = {psi__width}>
                    {props.binary.first[props.sumOutPut.length-1-props.keyValue-balance]}
                </ParSumItem>
            </CSSTransition>
            <CSSTransition
                timeout = {1000}
                in = {props.sumToggle}
                appear
                onEntered = {()=>setGo(true)}>
                <ParSumItem psiH = {psi__height} psiW = {psi__width}>
                    {props.binary.second[props.sumOutPut.length-1-props.keyValue-balance]}
                </ParSumItem>
            </CSSTransition>
        </div>
    );
};

export default ParSumBlock;