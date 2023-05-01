import React from 'react';

const ParSumItem = (props) => {
    if (props.children!==undefined)
    return (
        <div className='parsum__item' style = {{'--psi__width':props.psiW,'--psi__height':props.psiH}}>
            {props.children}
        </div>
    );
};

export default ParSumItem;