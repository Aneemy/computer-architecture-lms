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

    return (
        <div className="classes.input__form">
            <form action="">
                <input type="text" className={classes.input__field} value={props.data.first} onChange={(e)=>props.setData({...props.data,first:e.target.value})}/>
                <input type="text" className={classes.input__field} value = {props.data.second} onChange={(e)=>props.setData({...props.data,second:e.target.value})}/>
                <input type="button" value="Запуск" className={classes.input__button} onClick={()=>props.setBinary({first:convertToBinary(props.data.first),second:convertToBinary(props.data.second),set:true})}/>
            </form>
        </div>
    );
};

export default SumInput;