import React, {useState} from "react";
import SideBar from "./components/SideBar";
import Body from "./components/Body";
import './components/styles/main.css';
import Header from "./components/Header";
import SumInput from "./components/summators/SumInput";
import SumRow from "./components/summators/SumRow";

function App() {
    const [sumData,setSumData] = useState({first:'0',second:'0'})
    const [sumBinary,setSumBinary] = useState(sumData);
    const [gotBinary,setGotBinary] = useState(false);
    const [sums,SetSums]  = useState ([
        {id: 1, heading: 'Одноразрядный',links:'components'},
        {id: 2, heading: 'Многоразрядный',links:{
            first:'/summators/img/multiple.svg',
                second:'summators/img/multiplebegining.svg',
                third:'summators/img/multipleending.svg'
            }},
        {id: 3, heading: 'Параллельного действия'},
        {id: 4, heading: 'С групповым переносом'}
    ])
    const [curSum,SetCurSum] = useState(sums[0])

  return (
    <div className="App" >
        <Header/>
        <div style={{display:"flex"}}>
            <SideBar sums = {sums} curSum = {curSum} SetCurSum = {SetCurSum}/>
            <Body binary = {sumBinary} setBinary = {setSumBinary} flag = {gotBinary} curSum = {curSum} >
                <img src="components/summators/img/slon.jpg" alt="Моча"/>
                <SumInput data = {sumData} setData = {setSumData} binary = {sumBinary} setBinary = {setSumBinary} setFlag = {setGotBinary}/>
            </Body>
        </div>
    </div>
  );
}

export default App;
