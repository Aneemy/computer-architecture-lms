import React, {useEffect, useState} from 'react';
import MultiSumBlock from "./MultiSumBlock";
import SumToggleButton from "./SumToggleButton";
import SumResetButton from "./SumResetButton";

const MultiSum = (props) => {
    const sumWidth = Math.floor(props.bodyDimensions.width/props.sumOutPut.length-1)
    const [msIteration,setMsIteration] = useState(0);
    const changeMsIteration  = (iteration) =>{
        setMsIteration(iteration)
    }
    const [sumToggle,setSumToggle] = useState(false);
    const handleSumToggle = (toggle)=>{
        setSumToggle(!toggle)
    }
    const [update,setUpdate] = useState(1);

    const handleUpdate = (data) =>{
        setUpdate(data)
    }
    if(props.sumOutPut.length>1)
    return (
        <div>
            <div className="multisum__row" key = {update}>
                {props.sumOutPut.filter((number,index)=>index<props.binary.first.length).map((number,index)=>
                    <MultiSumBlock width = {sumWidth} key = {update+index} keyValue = {index} cursum = {props.curSum} sumBuffer = {props.sumBuffer}
                                   binary = {props.binary} sumOutPut = {props.sumOutPut} sumToggle = {sumToggle}
                                    msIteration = {msIteration} changeMsIteration = {changeMsIteration}/>
                )
                }
            </div>
            <SumToggleButton handleSumToggle = {handleSumToggle} sumToggle = {sumToggle}/>
            <SumResetButton handleSumToggle={handleSumToggle} changeIteration={changeMsIteration} curSum = {2} update = {update} handleUpdate = {handleUpdate}/>
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