import React from 'react';
import {CSSTransition} from "react-transition-group";

const SumRowItem = (props) => {
    return (
        <div className='sinsum__item'>
            {props.children}
        </div>
    );
};

export default SumRowItem;