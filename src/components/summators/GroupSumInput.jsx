import React, {useState} from 'react';

const GroupSumInput = (props) => {
    const [data,setData] = useState('')
    return (
        <div className="groupsum__input">
            По сколько сумматоров вы хотите сгрупировать?(не более {props.max})
            <input type="text" onChange={(e)=>setData(e.currentTarget.value)}/>
            <button onClick={()=>props.changeInputData(Number(data))}>Отправить</button>
        </div>
    );
};

export default GroupSumInput;