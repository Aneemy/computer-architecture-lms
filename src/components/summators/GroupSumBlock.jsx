import React, {useState} from 'react';
import GroupSumElem from "./GroupSumElem";
import GroupSumTransition from "./GroupSumTransition";

const GroupSumBlock = (props) => {
    const [triggerBuffer,setTriggerBuffer] = useState(false)
    const gsi__width = Math.floor(props.width/10);
    const gsi__height = Math.floor(props.width/11);
    const result = props.result
    const sumBuffer = props.sumBuffer.filter((number,index)=>index>props.binary.first.length-1-(props.keyValue+1)*props.step&&
        index<=props.binary.first.length-1-props.keyValue*props.step)
    const unitedArray = props.unitedArray.filter((number,index)=>index>=props.unitedArray.length-props.keyValue*props.step*2)
    const binary = {first:props.binary.first.filter((number,index)=>index>  props.binary.first.length-1-(props.keyValue+1)*props.step&&
            index<=props.binary.first.length-1-props.keyValue*props.step),
                    second:props.binary.second.filter((number,index)=>index>props.binary.first.length-1-(props.keyValue+1)*props.step&&
                        index<=props.binary.first.length-1-props.keyValue*props.step)
                    }
    const [curIterable,setCurIterable] = useState(0)
    function handleIterable(iter){
        setCurIterable(iter)
    }
    function Y(x,y)
    {
        return ((x==y)&&(y==1))?(1):(0);
    }

    function P(x,y)
    {
        return ((x==1) || (y==1))?(1):(0);
    }

    function C(mas,i)
    {
        if (i!=-2)
            return P(Y(mas[i],mas[i+1]),Y(C(mas,i-2),P(mas[i],mas[i+1])));
        else
            return 0;
    }
    function handleTrigger(data){
        setTriggerBuffer(data)
    }
    return (
        <div className='groupsum__block' style={{'--gsi__height':gsi__height}}>
            <GroupSumTransition
                keyValue = {props.keyValue}
                unitedArray = {unitedArray}
                gsi__width = {gsi__width}
                gsi__height = {gsi__height}
                sumToggle = {props.sumToggle}
                setTrigger = {handleTrigger}
                time = {props.time}
            />
            {result.filter((number,index)=>index>  props.binary.first.length-1-(props.keyValue+1)*props.step&&
                index<=props.binary.first.length-1-props.keyValue*props.step).map((number,index,array)=>
                <GroupSumElem trigger = {triggerBuffer} key = {index} keyValue = {index} cursum = {props.cursum}  width = {props.width} binary = {binary} result = {array}
                    gsi__width = {gsi__width} gsi__height = {gsi__height} sumToggle = {props.sumToggle} tBuf = {C(unitedArray,unitedArray.length-2)} isFirst = {props.isFirst}
                    sumBuffer = {sumBuffer} isLast = {index===array.length-1} handleIterable = {handleIterable} curIterable = {curIterable}
                              time = {props.time} changeShowResult = {props.changeShowResult}>
                </GroupSumElem>
            )
            }
        </div>
    );
};

export default GroupSumBlock;