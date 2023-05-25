import React from 'react';

const SumToggleButton = (props) => {
    return (
        <button className='sum__button' disabled={props.sumToggle} onClick={()=>props.handleSumToggle(props.sumToggle)}>Включить</button>
    );
};

export default SumToggleButton;