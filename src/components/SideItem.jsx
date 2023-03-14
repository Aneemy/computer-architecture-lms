import React from 'react';

const SideItem = (props) => {
    return (
        <div className="item">
            <div className="item__container">
                <div onClick={()=>props.SetCurSum(props.item)}>
                    {props.item.heading}
                </div>
            </div>
            
        </div>
    );
};

export default SideItem;