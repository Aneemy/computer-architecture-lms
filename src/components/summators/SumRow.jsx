import React, {useEffect, useState} from 'react';
import SumRowItem from "./SumRowItem";
import {CSSTransition} from "react-transition-group";

const SumRow = (props) => {
    const [numbers,setNumbers] = useState(props.row);
    const [currentIndex,setCurrentIndex] = useState(numbers.length-1)
    function itemIteration(){
        if(props.ph ==='left')
            props.changeIteration({left:numbers[currentIndex]});
        else
            props.changeIteration({right:numbers[currentIndex]});
        setNumbers(numbers.filter((_,index)=> index !== numbers.length-1))
        setCurrentIndex(currentIndex-1);
        if(props.ph==='right')
            props.changeIteration({it:props.iteration.it+1})
        }

    return (
        numbers.length>0 ?
        <div className = "sinsum__row">
            {numbers.map((number,index) =>
                <CSSTransition
                    in={currentIndex===index&&props.sumToggle}
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
        </div>
    );
};

export default SumRow;