import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import SumRowItem from "./SumRowItem";
const CurrentSummator = (props) => {
    const outStyle = props.sumOutPut.length*(-10);
    const classses = [
    {id:1,result:'sinsum__result',buf:'sinsum__buffer',item:'sinsum__item'},
    ]
    function Result() {
        const result = props.sumOutPut.length > 0 ? props.sumOutPut : null;
        if (result !== null) {
            return (
                <div className={classses[props.curSum.id-1].result} style={{right: `${outStyle}%`}}>
                    {result.map((number, index) =>
                        <CSSTransition
                            appear
                            key={index}
                            timeout={{
                                appear:2000,
                                enter:0
                            }}
                            mountOnEnter
                            classNames={classses[props.curSum.id-1].item}
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

    function Buffer(){
        const result = props.buffer.length > 0 ? props.buffer : null;
        let i = props.iteration.it-1;
        if (props.sumOutPut.length-props.buffer.length===1){
            props.changeIteration({it:props.iteration.it+1});
        }
        if(result!==null&&result[i]!==0&&result.length<props.sumOutPut.length) {
            return (
                <div className={classses[props.curSum.id-1].buf}>
                        <CSSTransition
                            appear
                            in={true}
                            timeout={{
                                appear:2000,
                                enter:0
                            }}
                        classNames={classses[props.curSum.id-1].item}>
                            <SumRowItem >
                                {result[i]}
                            </SumRowItem>
                        </CSSTransition>
                </div>
            )
        }
    }
    console.log(props.curSum)
    switch (props.curSum.id){
        case 1:{
            const Summator = props.curSum.links;
            return (
                <div style={{position:'relative'}}>
                    <Summator style = {{width: '100%',height:'100%'}} />
                    <Result/>
                    {props.iteration.it>0&&<Buffer/>}
                </div>
            );
        }
        case 2:{
            const Shead = props.curSum.links[0];
            const Sbody = props.curSum.links[1];
            const Stail = props.curSum.links[2];
            console.log(Shead,Sbody,Stail)
            return (
                <div >
                    <Shead style = {{width: '25%',height:'100%'}}/>
                    <Sbody style = {{width: '25%',height:'100%'}}/>
                    <Stail style = {{width: '25%',height:'100%'}}/>
                </div>
            );
        }
        case 3:{

        }
        break
        case 4:{

        }
    }
};

export default CurrentSummator;
