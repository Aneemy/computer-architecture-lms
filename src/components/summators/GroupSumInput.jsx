import React, {useState} from 'react';

const GroupSumInput = (props) => {
    const [data,setData] = useState('')
    function isNumeric(value) {
        return /^\d+$/.test(value);
    }
    const updateDate = (data) =>{
        if (isNumeric(data)){
            props.changeInputData(Number(data))
        }
        else alert('Введите положительное целое число')
    }
    return (
        <div className="groupsum__input">
            По сколько сумматоров вы хотите сгрупировать?(не более {props.max})
            <input type="text" onChange={(e)=>setData(e.currentTarget.value)}/>
            <button onClick={()=>updateDate(data)}>Отправить</button>
        </div>
    );
};

export default GroupSumInput;