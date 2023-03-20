import React from 'react';
const CurrentSummator = (props) => {
    const SvgComponent = props.curSum.links;
    console.log(props.curSum.links)
    return (
        <div >
            <SvgComponent style = {{width: '100%',height:'100%'}} />
        </div>
    );
};

export default CurrentSummator;
