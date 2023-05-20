import React from 'react';

const GroupSumItem = (props) => {
    var gsi__move = 0;
    if(props.gsiW!==undefined&&props.keyValue>=1 ){
        gsi__move = (props.gsiW-1)*(props.keyValue);
    }
    if (props.children!==undefined)
    return (
        <div className="groupsum__item" style={{'--gsi__height':props.gsiH,'--gsi__width':props.gsiW,'--gsi__time':props.time,'--gsi__move':gsi__move }}>
            {props.children}
        </div>
    );
};

export default GroupSumItem;