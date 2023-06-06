import React, {useEffect, useState} from 'react';
import GroupSumInput from "./GroupSumInput";
import GroupSumBlock from "./GroupSumBlock";
import SumToggleButton from "./SumToggleButton";
import SumResetButton from "./SumResetButton";
import SumTimer from "./SumTimer";
import SumResult from "./SumResult";

const GroupSum = (props) => {
    const [inputData,setInputData] = useState(0)
    let result = props.sumOutPut.length!==props.binary.first.length ? props.sumOutPut.filter((number,index)=>index>0) : props.sumOutPut;
    let num_blocks = result !==null ? Math.ceil(result.length/inputData) : null;
    const sumWidth = props.binary.first.length>8 ? Math.floor(props.bodyDimensions.width/8) : Math.floor(props.bodyDimensions.width/props.binary.first.length)
    const gsi__height = Math.floor(sumWidth/11*2);
    function uniteArrays(){
        let united = [];
        for (let i = 0;i<props.binary.first.length;i++){
            united.push(props.binary.first[i]);
            united.push(props.binary.second[i]);
        }
        return united
    }
    const unitedArray = uniteArrays();
    const changeInputData = (data) =>{
        setInputData(data)
    }
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
    const ChunckedResult = (inputData) =>{
        var chunckedArr = []
        var j = inputData-1;
        for (let i = 1;i<=num_blocks;i++){
            if (j<=result.length-1) {
                chunckedArr.push(j);
                j += inputData;
            }
            else chunckedArr.push(result.length-1)
        }
        return chunckedArr.map((value, index, array)=>
            <GroupSumBlock key = {index} keyValue = {index} value = {value} step = {inputData} cursum = {props.curSum}
                           sumBuffer = {props.sumBuffer} binary = {props.binary} sumOutPut = {props.sumOutPut}
                           sumToggle = {sumToggle} width = {sumWidth} unitedArray = {unitedArray}
                           result = {result} isFirst = {index === 0} time = {timer} changeShowResult = {changeShowResult}
            />)
    }
    return (
        <div >
            <GroupSumInput max ={result.length} changeInputData = {changeInputData}/>
            <div key = {update} className="groupsum__row" style={{width:props.bodyDimensions.width,'--gsi__height':gsi__height}}>
                {inputData!==0&&ChunckedResult(inputData)}
            </div>
            <div className="sum__buttons">
                {inputData&&<SumToggleButton handleSumToggle = {handleSumToggle} sumToggle = {sumToggle}/>}
                {inputData&&<SumResetButton handleSumToggle={handleSumToggle} curSum = {4} update = {update} handleUpdate = {handleUpdate} changeIteration = {handleUpdate}/>}
                {inputData&&<SumTimer sumToggle = {sumToggle} timer = {timer} changeTimer = {changeTimer}/>}
                {showResult&&<SumResult sumResult = {props.sumResult}/>}
            </div>
        </div>
    );
};

export default GroupSum;