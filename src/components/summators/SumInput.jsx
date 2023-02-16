import React from 'react';
import classes from "./styles/SumInput.module.css";
const SumInput = () => {
    const firstRef = React.useRef(null);
    const secondRef = React.useRef(null);
    const firstInput = firstRef.current;
    const secondInput = secondRef.current;
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
                <input type="text" ref = {firstRef} className={classes.input__field}/>
                <input type="text" ref = {secondRef} className={classes.input__field}/>
                <input type="button" value="Запуск" className={classes.input__button} onClick={()=>console.log(convertToBinary(firstInput.value),convertToBinary(secondInput.value))}/>
            </form>
        </div>
    );
};

export default SumInput;