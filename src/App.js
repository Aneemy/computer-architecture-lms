import React from "react";
import SideBar from "./components/SideBar";
import Body from "./components/Body";
import './components/styles/nullstyle.css';
import Header from "./components/Header";

function App() {
  return (
    <div className="App" >
        <Header/>
        <div style={{display:"flex"}}>
            <SideBar/>
            <Body/>
        </div>
    </div>
  );
}

export default App;
