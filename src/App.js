import React, {useState} from "react";
import SideBar from "./components/SideBar";
import Body from "./components/Body";
import './components/styles/nullstyle.css';
import Header from "./components/Header";
import SumInput from "./components/summators/SumInput";
import SumRow from "./components/summators/SumRow";

function App() {
    const [sumData,setSumData] = useState({first:'0',second:'0'})
    const [sumBinary,setSumBinary] = useState(sumData);
    const [gotBinary,setGotBinary] = useState(false);

  return (
    <div className="App" >
        <Header/>
        <div style={{display:"flex"}}>
            <SideBar/>
            <Body binary = {sumBinary} setBinary = {setSumBinary} flag = {gotBinary} >
                <SumInput data = {sumData} setData = {setSumData} binary = {sumBinary} setBinary = {setSumBinary} setFlag = {setGotBinary}/>
            </Body>
        </div>
    </div>
  );
}

export default App;
