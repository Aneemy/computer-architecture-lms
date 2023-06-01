import React from 'react';
import {CSSTransition} from "react-transition-group";

const SumRowItem = (props) => {
    return (
        <div className='sinsum__item' style ={{'--ssi__time':props.time}}>
            {props.children}
        </div>
    );
};

export default SumRowItem;