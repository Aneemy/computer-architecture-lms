import React, {useState} from 'react';
import SumRowItem from "./SumRowItem";
import {CSSTransition, Transition, TransitionGroup} from "react-transition-group";

const SumRow = (props) => {
    const numbers = props.row;
    return (
        <div className = "sinsum__row">
            {numbers.map((number,index) =>
                <CSSTransition in={props.on} key={index} classNames="sinsum__item" timeout={500} >
                    <SumRowItem key = {index}>{number}</SumRowItem>
                </CSSTransition>
            )}
        </div>
    );
};

export default SumRow;