import React, {useEffect, useState} from 'react';
import SumRow from "./summators/SumRow";
import './styles/main.css';
import CurrentSummator from "./summators/CurrentSummator";

const Body = (props) => {
const [sumToggle,setSumToggle]=useState(false);
const [leftSum,setLeftSum] = useState(0);
const [rightSum,setRightSum] = useState(0);
const [curIt,setCurIt] = useState({out:0,buf:0})
const [sumIt,setSumIt] = useState(0);
const [buffer,setBuffer] = useState([]);

    function SwitchButton(){
        if (sumToggle)
            return(
                <div>
                    Запущено
                </div>
            )
        else
            return(
                <button  onClick={()=> setSumToggle(!sumToggle)} style={{float:"right"}}>{'Включить'}</button>
            )

    }
    function OneOrNull(curIt, leftSum, rightSum) {
        let k = 0;
        k =  Number(curIt.buf)+Number(leftSum) + Number(rightSum);
        switch (k) {
            case 0:
                    return { out: 0, buf: 0 };
            case 1:
                return { out: 1, buf: 0 };
            case 2:
                return { out: 0, buf: 1 };
            case 3:
                return { out: 1, buf: 1 };
            default:return curIt;
        }
    }

    useEffect(() => {
        if(sumIt>=1){
        const newCurIt = OneOrNull(curIt, leftSum, rightSum);
        setCurIt(newCurIt);
        setBuffer([...buffer,newCurIt.buf])
    }}, [sumIt]);

    if(props.flag){
        return (
            <div className="body">
                <div className='container'>
                    {props.children}
                    <div>
                        <CurrentSummator  buffer = {buffer} on = {sumToggle} it = {sumIt} setIt = {setSumIt}  output = {props.sumOutPut} curSum = {props.curSum}/>
                            <div style={{display:"flex"}}>
                                <SumRow  it = {sumIt} setIt = {setSumIt} setSumData = {setLeftSum} on = {{sumToggle,setSumToggle}} row={props.binary.first}/>
                                <SumRow  it = {sumIt} setIt = {setSumIt} setSumData = {setRightSum} on = {{sumToggle,setSumToggle}} row={props.binary.second}/>
                            </div>
                        <SwitchButton/>
                    </div>
                </div>
            </div>
        )
    }
    else
    return (
        <div className="body">
            <div className='container'>
                {props.children}
            </div>
        </div>
    );
};

export default Body;