import React from 'react';
import classes from "./styles/SumRowItem.module.css";

const SumRowItem = (props) => {
    return (
        <div className={classes.SumRowItem}>
            {props.children}
        </div>
    );
};

export default SumRowItem;