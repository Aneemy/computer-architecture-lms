import React from 'react';

const ParSumItem = (props) => {
    var psi__move = 0;

    if(props.psiW!==undefined&&props.keyValue>=1 ){
        psi__move = (props.psiW-1)*(props.keyValue);
        }
    if (props.children!==undefined)
    return (
        <div className='parsum__item' style = {{'--psi__width':props.psiW,'--psi__height':props.psiH,'--psi__time':props.time,'--psi__move':psi__move}}>
            {props.children}
        </div>
    );
};

export default ParSumItem;