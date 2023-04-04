import React, {useState} from 'react';
import SideBlock from "./SideBlock";
const SideBar = (props) => {
    return (
        <div className='sidebar'>
            <SideBlock title={'Сумматоры'} items={props.sums} changeSumm = {props.changeSumm}/>
        </div>
    );
};

export default SideBar;