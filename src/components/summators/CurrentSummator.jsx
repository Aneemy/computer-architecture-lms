import React from 'react';
const CurrentSummator = (props) => {
    switch (props.curSum.id){
        case 1:{
            const Summator = props.curSum.links;
            return (
                <div >
                    <Summator style = {{width: '100%',height:'100%'}} />
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
        break
        case 3:{

        }
        break
        case 4:{

        }
    }
};

export default CurrentSummator;
