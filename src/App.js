import React, {useState} from "react";
import SideBar from "./components/SideBar";
import Body from "./components/Body";
import './components/styles/main.css';
import Header from "./components/Header";
import SumInput from "./components/summators/SumInput";
import {ReactComponent as SingleSvg} from "./single.svg";
import {ReactComponent as MultiHead} from "./multiplehead.svg";
import {ReactComponent as MultiBody} from "./multiplebody.svg";
import {ReactComponent as MultiTail} from "./multipletail.svg";

function App() {
    const [sumData,setSumData] = useState({first:'0',second:'0'})
    const [sumBinary,setSumBinary] = useState(sumData);
    const [sumReady,setSumReady] = useState(false);
    const [sums,SetSums]  = useState ([
        {id: 1, heading: 'Одноразрядный',links: SingleSvg},
        {id: 2, heading: 'Многоразрядный',links:[
            MultiHead,MultiBody,MultiTail
            ]},
        {id: 3, heading: 'Параллельного действия'},
        {id: 4, heading: 'С групповым переносом'}
    ])
    const [curSum,setCurSum] = useState(sums[0]);
    const [sumOutPut,setSumOutPut] = useState([])

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

  return (
    <div className="App" >
        <Header/>
        <div style={{display:"flex"}}>
            <SideBar sums = {sums} curSum = {curSum} changeSumm = {changeCurSum}/>
            <Body sumOutPut = {sumOutPut} binary = {sumBinary} flag = {sumReady} curSum = {curSum} >
                <SumInput data = {sumData} binary = {sumBinary} changeSumData = {changeSumData}  changeSumBinary = {changeSumBinary}
                          changeSumOutPut={changeSumOutPut} changeSumReady = {changeSumReady}/>
            </Body>
        </div>
    </div>
  );
}

export default App;
