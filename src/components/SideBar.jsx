import React, {useState} from 'react';
import classes from "./styles/SideBar.module.css";
import SideBlock from "./SideBlock";
const SideBar = () => {
    const [items,SetItems]  = useState ([
        {id: 1, heading: 'Одноразрядный'},
        {id: 2, heading: 'Многоразрядный'},
        {id: 3, heading: 'Параллельного действия'},
        {id: 4, heading: 'С групповым переносом'}
    ])
    return (
        <div className={classes.SideBar}>
            <SideBlock title={'Сумматоры'} items={items}/>
        </div>
    );
};

export default SideBar;