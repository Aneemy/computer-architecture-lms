import React from 'react';
import SideItem from "./SideItem";

const SideBlock = (props) => {
    return (
        <div className="side__block">
            <h2>{props.title}</h2>
            {props.items.map((item,index) =>
            <SideItem numer = {index + 1} item = {item} key = {item.id} SetCurSum = {props.SetCurSum}/>)}
        </div>
    );
};

export default SideBlock;