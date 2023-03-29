import React, {useState} from 'react';
import SumRowItem from "./SumRowItem";
import {CSSTransition} from "react-transition-group";

const SumRow = (props) => {
    const [numbers,setNumbers] = useState(props.row);
    const [currentIndex,setCurrentIndex] = useState(numbers.length-1)
    function itemIteration(){
        setNumbers(numbers.filter((_,index)=> index !== numbers.length-1))
        setCurrentIndex(currentIndex-1);
        props.setSumData(currentIndex)
    }


    return (
        numbers.length>0 ?
        <div className = "sinsum__row">
            {numbers.map((number,index) =>
                <CSSTransition
                    in={currentIndex===index&&props.on}
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
            <div>
            </div>
    );
};

export default SumRow;