import React, {useEffect, useState} from 'react';
import SumRow from "./summators/SumRow";
import './styles/main.css';
import CurrentSummator from "./summators/CurrentSummator";

const Body = (props) => {
const [sumToggle,setSumToggle]=useState(false);
const [buffer,setBuffer] = useState([]);
const [iteration,setIteration] =useState({it:0,left:0,right:0,out:0,buf:0})
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
    function OneOrNull(iteration){
        let k = 0;
        k =  Number(iteration.buf)+Number(iteration.left) + Number(iteration.right);
        switch (k) {
            case 0:
                return { out: 0, buf: 0 };
            case 1:
                return { out: 1, buf: 0 };
            case 2:
                return { out: 0, buf: 1 };
            case 3:
                return { out: 1, buf: 1 };
        }
    }
    useEffect(()=>{
        if(iteration.it>0){
            const newIteration = OneOrNull(iteration);
            setIteration({...iteration, out: newIteration.out, buf: newIteration.buf});
            setBuffer([...buffer,newIteration.buf])
        }
    },[iteration.it])
    const changeIteration = (update) =>{
        setIteration(prevIteration => ({...prevIteration, ...update}));
    }


    if(props.flag){
        return (
            <div className="body">
                <div className='container'>
                    {props.children}
                    <div>
                        <CurrentSummator  buffer = {buffer} iteration = {iteration} changeIteration = {changeIteration}
                                          sumToggle = {sumToggle}   sumOutPut = {props.sumOutPut} curSum = {props.curSum}/>
                        <div style={{display:"flex"}}>
                            <SumRow  iteration = {iteration} ph = 'left' changeIteration = {changeIteration}  sumToggle = {sumToggle} row={props.binary.first}/>
                            <SumRow  iteration = {iteration} ph = 'right' changeIteration = {changeIteration}
                                     sumToggle = {sumToggle} row={props.binary.second}/>
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