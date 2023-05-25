import React, {useEffect, useState} from 'react';
import ParSumBlock from "./ParSumBlock";
import SumToggleButton from "./SumToggleButton";
import SumResetButton from "./SumResetButton";

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

    return (
        <div>
             <div key = {update} className="parsum__row" style={{width:props.bodyDimensions.width}}>
                    {result.filter((number,index)=>index<props.binary.first.length).map((number,index)=>
                     <ParSumBlock key = {update+index} keyValue = {index} cursum = {props.curSum} sumBuffer = {props.sumBuffer}
                                  binary = {props.binary} sumOutPut = {props.sumOutPut} sumToggle = {sumToggle} width = {sumWidth}
                                    unitedArray = {unitedArray}/>
                    )
                    }
            </div>
            <SumToggleButton handleSumToggle = {handleSumToggle} sumToggle = {sumToggle}/>
            <SumResetButton handleSumToggle={handleSumToggle} curSum = {3} update = {update} handleUpdate = {handleUpdate} changeIteration = {handleUpdate}/>
        </div>
    );
};

export default ParSum;