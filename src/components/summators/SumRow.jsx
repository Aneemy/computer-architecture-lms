import React from 'react';
import SumRowItem from "./SumRowItem";

const SumRow = (props) => {
    const numbers = props.row;
    return (
        <div className='sinsum__row'>
            {numbers.map((number,index) =>
            <SumRowItem key = {index}>{number}</SumRowItem>)}
        </div>
    );
};

export default SumRow;