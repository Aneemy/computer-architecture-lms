import React, {useState} from 'react';
import Header from "./Header";
import SideBar from "./SideBar";
import Body from "./Body";
import SumInput from "./summators/SumInput";
import {ReactComponent as SingleSvg} from "../single.svg";
import {ReactComponent as MultiHead} from "../multiplehead.svg";
import {ReactComponent as MultiBody} from "../multiplebody.svg";
import {ReactComponent as MultiTail} from "../multipletail.svg";
import {ReactComponent as ParHead} from "../parallelhead.svg";
import {ReactComponent as ParBody} from "../parallelbody.svg";
import {ReactComponent as ParTail} from "../paralleltail.svg";
import {ReactComponent as GroupHead} from "../groupsum.svg";
import AuthForm from "./userInterface/AuthForm";

const Main = (props) => {
    const [sumData,setSumData] = useState({first:'0',second:'0'})
    const [sumBinary,setSumBinary] = useState(sumData);
    const [sumReady,setSumReady] = useState(false);
    const [sums,SetSums]  = useState ([
        {id: 1, heading: 'Одноразрядный',links: SingleSvg},
        {id: 2, heading: 'Многоразрядный',links:[
                MultiHead,MultiBody,MultiTail
            ]},
        {id: 3, heading: 'Параллельного действия',links: [
                ParHead,ParBody,ParTail
            ]},
        {id: 4, heading: 'С групповым переносом',links:
                [GroupHead,MultiBody]
        }
    ])
    const [curSum,setCurSum] = useState(sums[0]);
    const [sumOutPut,setSumOutPut] = useState([])
    const [sumBuffer,setSumBuffer] = useState([]);
    const [sumResult,setSumResult] = useState(null);
    const [openModal,setOpenModal] = useState(false)
    const changeCurSum = (summ) =>{
        setCurSum(summ)
    }
    const changeSumData = (data) =>{
        setSumData(data)
    }
    const changeSumBinary = (binary) =>{
        setSumBinary(binary)
    }
    const changeSumOutPut = (output) =>{
        setSumOutPut(output)
    }
    const changeSumReady = (ready) =>{
        setSumReady(ready)
    }
    const changeSumBuffer = (buffer) =>{
        setSumBuffer(buffer)
    }
    const changeSumResult = (result) =>{
        setSumResult(result)
    }
    const modalStyle = "modal__opened"
    const handleModal = () =>{
        setOpenModal(false)
    }
    return (
        <div >
            <Header openModal = {openModal} setOpenModal = {setOpenModal}/>
            <div className={openModal ? modalStyle : null} onClick={()=>{setOpenModal(false)}} style={{display:"flex"}}>
                <SideBar sums = {sums} curSum = {curSum} changeSumm = {changeCurSum}/>
                <Body sumBuffer = {sumBuffer} sumOutPut = {sumOutPut} binary = {sumBinary} flag = {sumReady} curSum = {curSum} sumResult = {sumResult} >
                    <SumInput data = {sumData} binary = {sumBinary} changeSumData = {changeSumData}  changeSumBinary = {changeSumBinary}
                              changeSumOutPut={changeSumOutPut} changeSumReady = {changeSumReady} changeSumBuffer = {changeSumBuffer}
                              changeSumResult = {changeSumResult}/>
                </Body>
            </div>
            {openModal ? <AuthForm/> : null}
        </div>
    );
};

export default Main;