import React from 'react';

const CurrentSummator = (props) => {
    console.log(props.curSum.links)
    return (
        <div>
            <img style={{width:'100px',height:'200px'}} src={props.curSum.links} alt="Кал"/>
        </div>
    );
};

export default CurrentSummator;