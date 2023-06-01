import React from 'react';

const SumTimer = (props) => {
    return (
        <div>
            <label htmlFor="time">Время анимации</label>
            <input disabled={props.sumToggle} name = "time" type="range" value={props.timer} min = "500" max = "5000" step="500" onChange={(e)=>props.changeTimer(Number(e.currentTarget.value))}/>
        </div>
);
};

export default SumTimer;