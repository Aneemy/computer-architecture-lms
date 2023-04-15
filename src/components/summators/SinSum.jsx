import React from 'react';
import {CSSTransition} from "react-transition-group";
import SumRowItem from "./SumRowItem";
import SumRow from "./SumRow";

const SinSum = (props) => {
    const outStyle = props.sumOutPut.length*(-10);
    const classses = {id:1,result:'sinsum__result',buf:'sinsum__buffer',item:'sinsum__item'};
    function Buffer(){
        const result = props.sumBuffer.length > 0 ? props.sumBuffer : null;
        let i = props.iteration.it-1
        if (props.sumOutPut.length-props.sumBuffer.length===i)
            props.changeIteration({it:props.iteration.it+1})
        if(result!==null&&result[i]!==undefined) {
            return (
                <div className={classses.buf}>
                    <CSSTransition
                        appear
                        in={true}
                        timeout={{
                            appear:2000,
                            enter:0
                        }}
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
                            in={(index >= (props.sumOutPut.length - props.iteration.it) && props.sumToggle)}
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
            {props.iteration.it>0&&<Buffer/>}
            </div>
            <div style={{display:"flex",position:'absolute'}}>
                <SumRow  iteration = {props.iteration} ph = 'left' changeIteration = {props.changeIteration}  sumToggle = {props.sumToggle} row={props.binary.first}/>
                <SumRow  iteration = {props.iteration} ph = 'right' changeIteration = {props.changeIteration}
                         sumToggle = {props.sumToggle} row={props.binary.second}/>
            </div>
        </div>
    );
};

export default SinSum;