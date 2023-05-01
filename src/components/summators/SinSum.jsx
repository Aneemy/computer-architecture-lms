import React, {useEffect, useState} from 'react';
import {CSSTransition} from "react-transition-group";
import SumRowItem from "./SumRowItem";
import SumRow from "./SumRow";

const SinSum = (props) => {
    let decider = false;
    const outStyle = props.sumOutPut.length*(-10);
    const classses = {id:1,result:'sinsum__result',buf:'sinsum__buffer',item:'sinsum__item'};
    const [iteration,setIteration] =useState({it:0,left:0,right:0,out:0,buf:0});
    const changeIteration = (update) =>{
        setIteration(prevIteration => ({...prevIteration, ...update}));
    }
    if ((props.sumOutPut.length===props.sumBuffer.length)&&(props.sumBuffer.length===iteration.it))
        decider = true;
    function handleBuffer(){
        if (props.sumOutPut.length-props.sumBuffer.length===1&&iteration.it === props.sumBuffer.length) {
            changeIteration({it: iteration.it + 1})
        }
    }
    function Buffer(){
        const result = props.sumBuffer.length > 0 ? props.sumBuffer : null;
        let i =iteration.it-1;
        if(result!==null&&result[i]!==undefined&&!decider) {
            return (
                <div className={classses.buf}>
                    <CSSTransition
                        appear
                        in={true}
                        timeout={{
                            appear:2000,
                            enter:0
                        }}
                        onEntered = {handleBuffer}
                        classNames={classses.item}>
                        <SumRowItem >
                            {result[i]}
                        </SumRowItem>
                    </CSSTransition>
                </div>
            )
        }
    }
    function Result() {
        const result = props.sumOutPut.length > 0 ? props.sumOutPut : null;
        if (result !== null) {
            return (
                <div className={classses.result} style={{right: `${outStyle}%`}}>
                    {result.map((number, index) =>
                        <CSSTransition
                            appear
                            key={index}
                            timeout={{
                                appear:2000,
                                enter:0
                            }}
                            mountOnEnter
                            classNames={classses.item}
                            in={(index >= (props.sumOutPut.length - iteration.it) && props.sumToggle)}
                            onEntering={() => {
                            }}>
                            <SumRowItem key={index}>
                                {number}
                            </SumRowItem>
                        </CSSTransition>
                    )}
                </div>
            )
        }
    }


    const Summator = props.curSum.links;

    return (
        <div style={{position:'relative'}}>
            <div>
            <Summator style = {{width: '100%',height:'100%'}} />
            <Result/>
            {iteration.it>0&&<Buffer/>}
            </div>
            <div style={{display:"flex",position:'absolute'}}>
                <SumRow  iteration = {iteration} ph = 'left' changeIteration = {changeIteration}  sumToggle = {props.sumToggle} row={props.binary.first}/>
                <SumRow  iteration = {iteration} ph = 'right' changeIteration = {changeIteration}
                         sumToggle = {props.sumToggle} row={props.binary.second}/>
            </div>
        </div>
    );
};

export default SinSum;