import React from 'react';
import classes from "./styles/SumInput.module.css";
const SumInput = (props) => {
    function convertToBinary(x) {
        let bin = 0;
        let rem, i = 1, step = 1;
        while (x !== 0) {
            rem = x % 2;
            x = parseInt(x / 2);
            bin = bin + rem * i;
            i = i * 10;
        }
        return bin;
    }
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
    function prepareBinary() {
        if (props.binary.set) {
            props.setBinary({
                first: convertToBinary(props.data.first),
                second: convertToBinary(props.data.second),
                set: true
            });
            console.log(props.binary);
            binaryEqualizer(props.binary.first, props.binary.second);
            console.log(props.binary);
        }
    }
    return (
        <div className="classes.input__form">
            <form action="">
                <input type="text" className={classes.input__field} value={props.data.first} onChange={(e)=>props.setData({...props.data,first:e.target.value})}/>
                <input type="text" className={classes.input__field} value = {props.data.second} onChange={(e)=>props.setData({...props.data,second:e.target.value})}/>
                <input type="button" value="Запуск" className={classes.input__button} onClick={()=>{props.setBinary({...props.binary,set:true});prepareBinary()}}/>
            </form>
        </div>
    );
};

export default SumInput;