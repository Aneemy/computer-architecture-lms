import React, {useEffect, useState} from 'react';
import classes from "./styles/Body.module.css";
import SumRow from "./summators/SumRow";

const Body = (props) => {
    function nearestPowerOfTwo(num) {
        let power = 1;
        while (power < num) {
            power *= 2;
        }
        return power;
    }
    function elaborateArray(array,maxlength){
        var curlen = array.length;
        var resarr = new Array(maxlength);
        for (let i = 0;i<maxlength-curlen;i++){
            resarr[i] = '0';
        }
        let j = 0;
        for (let i = maxlength-curlen; i<maxlength;i++){
            resarr[i]=array[j];
            j++
        }
        return resarr;
    }
    function binaryEqualizer(firstNum,secondNum){
        var first = firstNum.toString().split('');
        var second = secondNum.toString().split('');
        const maxlength = nearestPowerOfTwo(Math.max(first.length,second.length));
        props.setBinary({first:elaborateArray(first,maxlength),second:elaborateArray(second,maxlength)});
    }

    if(props.binary.set){
        return (
            <div className={classes.Body}>
                <div className={classes.Container}>
                    {props.children}
                    <SumRow row={props.binary.first}/>
                    <SumRow row={props.binary.second}/>
                </div>
            </div>
        )
    }
    else
    return (
        <div className={classes.Body}>
            <div className={classes.Container}>
                {props.children}
            </div>
        </div>
    );
};

export default Body;