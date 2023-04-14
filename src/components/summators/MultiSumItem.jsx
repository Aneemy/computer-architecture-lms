import React from 'react';

const MultiSumItem = (props) => {
    if (props.children!==undefined)
    return (
        <div className='multisum__item' style = {{'--msi__width':props.msiW,'--msi__height':props.msiH}}>
            {props.children}
        </div>
    )
    else
    return null
};

export default MultiSumItem;