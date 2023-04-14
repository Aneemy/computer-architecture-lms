import React from 'react';
import SinSum from "./SinSum";
import MultiSum from "./MultiSum";
const CurrentSummator = (props) => {
    switch (props.curSum.id){
        case 1:{
            return(
            <SinSum sumBuffer = {props.sumBuffer} iteration = {props.iteration} changeIteration = {props.changeIteration}
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

        }
        break
        case 4:{

        }
    }
};

export default CurrentSummator;
