import React from 'react';

const SideItem = (props) => {
    return (
        <div className="sidebar__item">
                <div onClick={()=>props.changeSumm(props.item)}>
                    {props.item.heading}
                </div>
            
        </div>
    );
};

export default SideItem;