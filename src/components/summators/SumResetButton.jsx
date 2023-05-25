import React from 'react';

const SumResetButton = (props) =>
{
    let current = props.update;
    let iteration;
    switch (props.curSum){
        case 1:
             iteration = { it: 0, left: 0, right: 0, out: 0, buf: 0 }
            break;
        case 2:
             iteration = 0;
            break;
        case 3:
            iteration = current;
            break;
    }
    function SumReset(){
        props.changeIteration(iteration);
        props.handleSumToggle(true);
        props.resetRows();
        props.handleUpdate(current+2);
        console.log('reset')
    }
    return (
        <button className="sum__button" onClick={SumReset}>Обновить </button>
    );
};

export default SumResetButton;