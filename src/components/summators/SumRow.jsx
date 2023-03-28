import React, {useEffect, useLayoutEffect, useState} from 'react';
import SumRowItem from "./SumRowItem";
import {CSSTransition} from "react-transition-group";

const SumRow = (props) => {
    const [numbers,setNumbers] = useState(props.row);
    const [iteration,setIteration] = useState(false);
    const [currentIndex,setCurrentIndex] = useState(numbers.length-1)
    function itemIteration(){
        setNumbers(numbers.filter((_,index)=> index !== numbers.length-1))
        setCurrentIndex(currentIndex-1);
        setIteration(true);
    }
    useLayoutEffect(() => {
        if(props.on&&numbers.length>0){
            console.log("effect")
        }
    }, [props.on,numbers,iteration]);


    return (
        numbers.length>0 ?

        <div className = "sinsum__row">
            {numbers.map((number,index) =>
                <CSSTransition
                    in={currentIndex===index&&props.on}
                    key={index}
                    classNames="sinsum__item"
                    timeout={2000}
                    onEntered = {()=>itemIteration()}
                    >
                    <SumRowItem key = {index}>{number}</SumRowItem>
                </CSSTransition>
            )}
        </div>
            :
            <div>
                Кончился
            </div>
    );
};

export default SumRow;