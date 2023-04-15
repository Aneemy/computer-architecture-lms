import React, {useEffect, useRef, useState} from 'react';
import SumRow from "./summators/SumRow";
import './styles/main.css';
import CurrentSummator from "./summators/CurrentSummator";

const Body = (props) => {
    const [sumToggle,setSumToggle]=useState(false);
    const [buffer,setBuffer] = useState([]);
    const [iteration,setIteration] =useState({it:0,left:0,right:0,out:0,buf:0});
    const [bodyDimensions, setBodyDimensions] = useState({width: 0, height: 0});

    const bodyRef = useRef(null);

    function SwitchButton(){
        return(
            <button onClick={()=> setSumToggle(!sumToggle)} style={{float:"right",marginTop:'25px'}}>{'Включить'}</button>
        )
        // if (sumToggle)
        //     return null
        // else
        //     return(
        //         <button onClick={()=> setSumToggle(!sumToggle)} style={{float:"right"}}>{'Включить'}</button>
        //     )

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

    useEffect(() => {
        if (bodyRef.current) {
            setBodyDimensions({
                width: bodyRef.current.offsetWidth,
                height: bodyRef.current.offsetHeight,
            });
            console.log(bodyRef.current.offsetWidth,bodyRef.current.offsetHeight)
        }
    }, [bodyRef.current]);

    const changeIteration = (update) =>{
        setIteration(prevIteration => ({...prevIteration, ...update}));
    }

    if(props.flag){
        return (
            <div className="body" ref={bodyRef}>
                <div className='container'>
                    {props.children}
                    <div>
                        <CurrentSummator
                            buffer = {buffer}
                            iteration = {iteration}
                            changeIteration = {changeIteration}
                            sumToggle = {sumToggle}
                            sumBuffer = {props.sumBuffer}
                            sumOutPut = {props.sumOutPut}
                            curSum = {props.curSum}
                            binary = {props.binary}
                            bodyDimensions = {bodyDimensions}
                        />
                        <SwitchButton/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="body" ref={bodyRef}>
                <div className='container'>
                    {props.children}
                </div>
            </div>
        );
    }
};

export default Body;