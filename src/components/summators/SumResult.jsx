import React from 'react';

const SumResult = (props) => {
    return (
        <div className="sum__result">
            Итоговый результат : {props.sumResult}
        </div>
    );
};

export default SumResult;