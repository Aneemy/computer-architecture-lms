import React, {useState} from 'react';
import MultiSumBlock from "./MultiSumBlock";

const MultiSum = (props) => {
    const sumWidth = Math.floor(props.bodyDimensions.width/props.sumOutPut.length-1)
    const [msIteration,setMsIteration] = useState(0);
    const changeMsIteration  = (iteration) =>{
        setMsIteration(iteration)
    }
    if(props.sumOutPut.length>1)
    return (
        <div  className="multisum__row">
            {props.sumOutPut.map((number,index)=>
                <MultiSumBlock width = {sumWidth} key = {index} keyValue = {index} cursum = {props.curSum} sumBuffer = {props.sumBuffer}
                               binary = {props.binary} sumOutPut = {props.sumOutPut} sumToggle = {props.sumToggle}
                                msIteration = {msIteration} changeMsIteration = {changeMsIteration}/>
            )
            }
        </div>
    );
    else
        return (
            <div>
                Слишком малая длина бинарного числа
            </div>
        )
};

export default MultiSum;