import React from 'react';
import ParSumBlock from "./ParSumBlock";

const ParSum = (props) => {
    const sumWidth = Math.floor(props.bodyDimensions.width/props.sumOutPut.length-1)
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


    return (
         <div className="parsum__row" style={{width:props.bodyDimensions.width}}>
                {result.filter((number,index)=>index<props.binary.first.length).map((number,index)=>
                 <ParSumBlock key = {index} keyValue = {index} cursum = {props.curSum} sumBuffer = {props.sumBuffer}
                              binary = {props.binary} sumOutPut = {props.sumOutPut} sumToggle = {props.sumToggle} width = {sumWidth}
                                unitedArray = {unitedArray}/>
                )
                }
        </div>
    );
};

export default ParSum;