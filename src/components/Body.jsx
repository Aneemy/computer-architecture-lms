import React, {useState} from 'react';
import classes from "./styles/Body.module.css";
import SumRow from "./summators/SumRow";

const Body = (props) => {
    if(props.binary.set){
        return (
            <div className={classes.Body}>
                <div className={classes.Container}>
                    {props.children}
                    <SumRow row={props.binary.first}/>
                    <SumRow row={props.binary.second}/>
                </div>
            </div>
        )
    }
    else
    return (
        <div className={classes.Body}>
            <div className={classes.Container}>
                {props.children}
            </div>
        </div>
    );
};

export default Body;