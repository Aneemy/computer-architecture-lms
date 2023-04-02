import React, {useEffect, useState} from 'react';
import SumRowItem from "./SumRowItem";
import {CSSTransition} from "react-transition-group";

const SumRow = (props) => {
    const [numbers,setNumbers] = useState(props.row);
    const [currentIndex,setCurrentIndex] = useState(numbers.length-1)
    function itemIteration(){
        props.setSumData(numbers[currentIndex]);
        setNumbers(numbers.filter((_,index)=> index !== numbers.length-1))
        setCurrentIndex(currentIndex-1);
        props.setIt(props.it+1);
    }
    // function SumReset(){
    //     props.restart.setRestart(true);
    //     setNumbers(props.row);
    //     setCurrentIndex(props.row.length - 1);
    // }

    return (
        numbers.length>0 ?
        <div className = "sinsum__row">
            {numbers.map((number,index) =>
                <CSSTransition
                    in={currentIndex===index&&props.on.sumToggle}
                    key={index}
                    classNames="sinsum__item"
                    timeout={1000}
                    onEntered = {()=>itemIteration()}
                    >
                    <SumRowItem key = {index}>{number}</SumRowItem>
                </CSSTransition>
            )}
        </div>
            :
            // <SumReset/>
        <div>
            Masyanya
        </div>
    );
};

export default SumRow;