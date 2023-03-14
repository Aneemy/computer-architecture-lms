import React, {useState} from 'react';
import SideBlock from "./SideBlock";
const SideBar = (props) => {
    return (
        <div className='SideBar'>
            <SideBlock title={'Сумматоры'} items={props.sums} SetCurSum = {props.SetCurSum}/>
        </div>
    );
};

export default SideBar;