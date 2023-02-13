import React from 'react';
import SideItem from "./SideItem";

const SideBlock = ({title,items}) => {
    return (
        <div className="side__block">
            <h2>{title}</h2>
            {items.map((item,index) =>
            <SideItem numer = {index + 1} item = {item} key = {item.id}/>)}
        </div>
    );
};

export default SideBlock;