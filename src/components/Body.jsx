import React, {useEffect, useState} from 'react';
import SumRow from "./summators/SumRow";
import './styles/main.css';
import CurrentSummator from "./summators/CurrentSummator";

const Body = (props) => {
const [sumToggle,setSumToggle]=useState(false);
const [leftSum,setLeftSum] = useState(0);
const [rightSum,setRightSum] = useState(0);
const [curIt,setCurIt] = useState({out:0,buf:0})
    function OneOrNull() {
        var k = 0;
        if (leftSum === 1)
            k++
        if (rightSum === 1)
            k++
        if (k===2&&curIt.buf === 1)
            k++
        return k;
    }
useEffect((()=>{
    setCurIt({...curIt,out:OneOrNull()})
}),[rightSum])

    if(props.flag){
        return (
            <div className="body">
                <div className='container'>
                    {props.children}
                    <div>
                        <CurrentSummator curSum = {props.curSum}/>
                            <div style={{display:"flex"}}>
                                <SumRow  setSumData = {setLeftSum} on = {sumToggle} row={props.binary.first}/>
                                <SumRow  setSumData = {setRightSum} on = {sumToggle} row={props.binary.second}/>
                            </div>
                        <button  onClick={()=> setSumToggle(!sumToggle)} style={{float:"right"}}>Включить</button>
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