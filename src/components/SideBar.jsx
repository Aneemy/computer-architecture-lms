import React, {useState} from 'react';
import SideBlock from "./SideBlock";
const SideBar = (props) => {
    return (
        <div style={{width:Math.floor(1920*0.1)}} className='sidebar'>
            <SideBlock title={'Сумматоры'} items={props.sums} changeSumm = {props.changeSumm}/>
        </div>
    );
};

export default SideBar;