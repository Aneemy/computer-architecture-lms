import React from 'react';

const SumRowItem = (props) => {
    return (
        <div className='sinsum__item'>
            {props.children}
        </div>
    );
};

export default SumRowItem;