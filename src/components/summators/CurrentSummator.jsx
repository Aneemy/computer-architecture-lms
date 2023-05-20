import React from 'react';
import SinSum from "./SinSum";
import MultiSum from "./MultiSum";
import ParSum from "./ParSum";
import GroupSum from "./GroupSum";
const CurrentSummator = (props) => {
    switch (props.curSum.id){
        case 1:{
            return(
            <SinSum sumBuffer = {props.sumBuffer}
                    sumToggle = {props.sumToggle}   sumOutPut = {props.sumOutPut} curSum = {props.curSum}
                    binary = {props.binary}/>
            )
        }
        case 2:{
            return(
            <MultiSum sumBuffer = {props.sumBuffer} iteration = {props.iteration} changeIteration = {props.changeIteration}
                      sumToggle = {props.sumToggle}   sumOutPut = {props.sumOutPut} curSum = {props.curSum}
                      binary = {props.binary} bodyDimensions = {props.bodyDimensions}/>
            )
        }
        case 3:{
            return (
                <ParSum sumBuffer = {props.sumBuffer} iteration = {props.iteration} changeIteration = {props.changeIteration}
                        sumToggle = {props.sumToggle}   sumOutPut = {props.sumOutPut} curSum = {props.curSum}
                        binary = {props.binary} bodyDimensions = {props.bodyDimensions}/>
            )
        }
        case 4:{
            return (
                <GroupSum sumBuffer = {props.sumBuffer} iteration = {props.iteration} changeIteration = {props.changeIteration}
                          sumToggle = {props.sumToggle}   sumOutPut = {props.sumOutPut} curSum = {props.curSum}
                          binary = {props.binary} bodyDimensions = {props.bodyDimensions}/>
            )
        }
    }
};

export default CurrentSummator;
