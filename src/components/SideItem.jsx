import React from 'react';

const SideItem = (props) => {
    return (
        <div className="item">
            <div className="item__container">
                <div>
                    {props.item.heading}
                </div>
            </div>
            
        </div>
    );
};

export default SideItem;