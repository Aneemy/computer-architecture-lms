import React from 'react';
import SumRowItem from "./SumRowItem";
import classes from "./styles/SumRow.module.css";

const SumRow = (props) => {
    const numbers = props.row;
    return (
        <div className={classes.SumRow}>
            {numbers.map((number,index) =>
            <SumRowItem key = {index}>{number}</SumRowItem>)}
        </div>
    );
};

export default SumRow;