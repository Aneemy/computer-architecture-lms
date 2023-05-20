import React, {useState} from 'react';
import GroupSumInput from "./GroupSumInput";
import GroupSumBlock from "./GroupSumBlock";

const GroupSum = (props) => {
    const [inputData,setInputData] = useState(0)
    let result = props.sumOutPut.length!==props.binary.first.length ? props.sumOutPut.filter((number,index)=>index>0) : props.sumOutPut;
    let num_blocks = result !==null ? Math.ceil(result.length/inputData) : null;
    const sumWidth = Math.floor(props.bodyDimensions.width/props.sumOutPut.length)
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
    console.log (result,unitedArray,props.binary.first,props.binary.second)
    const changeInputData = (data) =>{
        setInputData(data)
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
                           sumToggle = {props.sumToggle} width = {sumWidth} unitedArray = {unitedArray}
                           result = {result} isFirst = {index === 0}
            />)
    }
    return (
        <div >
            <GroupSumInput changeInputData = {changeInputData}/>
            <div className="groupsum__row" style={{width:props.bodyDimensions.width,'--gsi__height':gsi__height}}>
            {inputData!==0&&ChunckedResult(inputData)}
            </div>
        </div>
    );
};

export default GroupSum;