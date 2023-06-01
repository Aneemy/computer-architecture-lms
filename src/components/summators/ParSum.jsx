import React, {useEffect, useState} from 'react';
import ParSumBlock from "./ParSumBlock";
import SumToggleButton from "./SumToggleButton";
import SumResetButton from "./SumResetButton";
import SumTimer from "./SumTimer";
import SumResult from "./SumResult";
import MultiSumBlock from "./MultiSumBlock";

const ParSum = (props) => {
    const sumWidth = Math.floor(props.bodyDimensions.width/8)
    const result = props.sumOutPut;
    function uniteArrays(){
        let united = [];
        for (let i = 0;i<props.binary.first.length;i++){
            united.push(props.binary.first[i]);
            united.push(props.binary.second[i]);
        }
        return united
    }
    const unitedArray = uniteArrays();
    const [sumToggle,setSumToggle] = useState(false);
    const handleSumToggle = (toggle)=>{
        setSumToggle(!toggle)
    }
    const [update,setUpdate] = useState(1);

    const handleUpdate = (data) =>{
        setUpdate(data)
    }
    useEffect(()=>{
        if (!sumToggle){
        setUpdate(update+1)
            console.log(sumToggle,update)
            }
    },
        [sumToggle])
    const [timer,setTimer] = useState(2500);

    const changeTimer = (time) =>{
        setTimer(time)
    }
    const [showResult,setShowResult] = useState(false);
    const changeShowResult  = (result) =>{
        setShowResult(result)
    }
    if(props.sumOutPut.length>1)
        return (
            <div>
                <div key = {update} className="parsum__row" style={{width:props.bodyDimensions.width}}>
                    {props.sumOutPut.filter((number,index)=>index<props.binary.first.length).map((number,index)=>
                        <ParSumBlock time = {timer} key = {update+index} keyValue = {index} cursum = {props.curSum} sumBuffer = {props.sumBuffer}
                                     binary = {props.binary} sumOutPut = {props.sumOutPut} sumToggle = {sumToggle} width = {sumWidth}
                                     unitedArray = {unitedArray} changeShowResult = {changeShowResult}/>
                    )
                    }
                </div>
                <div className="sum__buttons">
                    <SumToggleButton handleSumToggle = {handleSumToggle} sumToggle = {sumToggle}/>
                    <SumResetButton handleSumToggle={handleSumToggle} curSum = {3} update = {update} handleUpdate = {handleUpdate} changeIteration = {handleUpdate}/>
                    <SumTimer sumToggle = {sumToggle} timer = {timer} changeTimer = {changeTimer}/>
                    {/*{showResult&&<SumResult sumResult = {props.sumResult}/>}*/}
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

export default ParSum;