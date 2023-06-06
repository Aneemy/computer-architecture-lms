import React, {useEffect, useState} from 'react';
import MultiSumBlock from "./MultiSumBlock";
import SumToggleButton from "./SumToggleButton";
import SumResetButton from "./SumResetButton";
import SumTimer from "./SumTimer";
import SumResult from "./SumResult";

const MultiSum = (props) => {
    const sumWidth = props.binary.first.length>8 ? Math.floor(props.bodyDimensions.width/8) : Math.floor(props.bodyDimensions.width/props.binary.first.length)
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
    const [timer,setTimer] = useState(2500);

    const changeTimer = (time) =>{
        setTimer(time)
    }
    const [showResult,setShowResult] = useState(false);
    const changeShowResult  = (result) =>{
        setShowResult(result)
    }
    console.log(sumWidth)
    if(props.sumOutPut.length>1)
    return (
        <div>
            <div className="multisum__row" key = {update} style={{width:props.bodyDimensions.width}}>
                {props.sumOutPut.filter((number,index)=>index<props.binary.first.length).map((number,index)=>
                    <MultiSumBlock time = {timer} width = {sumWidth} key = {update+index} keyValue = {index} cursum = {props.curSum} sumBuffer = {props.sumBuffer}
                                   binary = {props.binary} sumOutPut = {props.sumOutPut} sumToggle = {sumToggle}
                                    msIteration = {msIteration} changeMsIteration = {changeMsIteration} changeShowResult = {changeShowResult}/>
                )
                }
            </div>
            <div className="sum__buttons">
                <SumToggleButton handleSumToggle = {handleSumToggle} sumToggle = {sumToggle}/>
                <SumResetButton handleSumToggle={handleSumToggle} changeIteration={changeMsIteration} curSum = {2} update = {update} handleUpdate = {handleUpdate}/>
                <SumTimer sumToggle = {sumToggle} timer = {timer} changeTimer = {changeTimer}/>
                {showResult&&<SumResult sumResult = {props.sumResult}/>}
            </div>
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