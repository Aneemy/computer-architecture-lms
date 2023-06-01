import React from 'react';
import SinSum from "./SinSum";
import MultiSum from "./MultiSum";
import ParSum from "./ParSum";
import GroupSum from "./GroupSum";
const CurrentSummator = (props) => {
    switch (props.curSum.id){
        case 1:{
            return(
            <SinSum key = {props.sumOutPut} sumBuffer = {props.sumBuffer}
                    sumToggle = {props.sumToggle}   sumOutPut = {props.sumOutPut} curSum = {props.curSum}
                    binary = {props.binary} sumResult = {props.sumResult}/>
            )
        }
        case 2:{
            return(
            <MultiSum key = {props.binary.first} sumBuffer = {props.sumBuffer} iteration = {props.iteration} changeIteration = {props.changeIteration}
                      sumToggle = {props.sumToggle}   sumOutPut = {props.sumOutPut} curSum = {props.curSum}
                      binary = {props.binary} bodyDimensions = {props.bodyDimensions} sumResult = {props.sumResult}/>
            )
        }
        case 3:{
            return (
                <ParSum key = {props.binary.second} sumBuffer = {props.sumBuffer} iteration = {props.iteration} changeIteration = {props.changeIteration}
                        sumToggle = {props.sumToggle}   sumOutPut = {props.sumOutPut} curSum = {props.curSum}
                        binary = {props.binary} bodyDimensions = {props.bodyDimensions} sumResult = {props.sumResult}/>
            )
        }
        case 4:{
            return (
                <GroupSum key = {props.sumBuffer} sumBuffer = {props.sumBuffer} iteration = {props.iteration} changeIteration = {props.changeIteration}
                          sumToggle = {props.sumToggle}   sumOutPut = {props.sumOutPut} curSum = {props.curSum}
                          binary = {props.binary} bodyDimensions = {props.bodyDimensions} sumResult = {props.sumResult}/>
            )
        }
    }
};

export default CurrentSummator;
