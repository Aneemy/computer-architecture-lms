import React from 'react';
import Header from "../Header";
import SideBar from "../SideBar";
import Body from "../Body";
import DbSideBar from "./DBSideBar";

const Dashboard = (props) => {
    return (
        <div>
            <Header/>
            <div style={{display:"flex"}}>
                <DbSideBar/>
                <Body/>
            </div>
        </div>
    );
};

export default Dashboard;