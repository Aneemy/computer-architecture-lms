import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import SumRowItem from "./SumRowItem";
const CurrentSummator = (props) => {
    const [outStyle,setOutStyle] = useState((props.output.length)*(-10));
    console.log(props.output)
    function Result() {

        const result = props.output.length > 0 ? props.output : null;
        if (result !== null) {
            return (
                <div className='sinsum__result' style={{right: `${outStyle}%`}}>
                    {result.map((number, index) =>
                        <CSSTransition
                            appear
                            key={index}
                            timeout={{
                                appear:1000,
                                enter:0
                            }}
                            mountOnEnter
                            classNames='sinsum__item'
                            in={(index >= (props.output.length - props.it) && props.on)}
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
        let i = props.it;
        if (props.output.length-props.buffer.length===1){
            props.setIt(props.it+1);
            i++
        }
        if(result!==null&&result[i-1]!==0&&result.length<props.output.length) {
            return (
                <div className='sinsum__buffer'>
                        <CSSTransition
                            appear
                            in={true}
                            timeout={{
                                appear:2000,
                                enter:0
                            }}
                        classNames={'sinsum__item'}>
                            <SumRowItem >
                                {result[i-1]}
                            </SumRowItem>
                        </CSSTransition>
                </div>
            )
        }
    }
    switch (props.curSum.id){
        case 1:{
            const Summator = props.curSum.links;
            return (
                <div style={{position:'relative'}}>
                    <Summator style = {{width: '100%',height:'100%'}} />
                    <Result/>
                    <Buffer/>
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
