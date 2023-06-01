import React from 'react';

const AInput = (props) => {
    return (
        <input
            value={props.data}
            onChange={(e)=>props.changeData(e.target.value)}
            type={props.type}
            placeholder={props.placeholder}
        />
    );
};

export default AInput;