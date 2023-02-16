import React from 'react';
import classes from "./styles/Body.module.css";

const Body = (props) => {
    return (
        <div className={classes.Body}>
            <div className={classes.Container}>
            {props.children}
            </div>
        </div>
    );
};

export default Body;