import React from 'react';
import Header from "../Header";
import SideBar from "../SideBar";
import Body from "../Body";
import DbSideBar from "./DBSideBar";
import {modalStyle} from "../Main";
import {closeModal} from "../../reducers/uiReducer";
import {useDispatch, useSelector} from "react-redux";
import AuthForm from "../userInterface/AuthForm";

const Dashboard = (props) => {
    const openedModal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    return (
        <div>
            <Header/>
            <div className={openedModal ? modalStyle : null} onClick={()=>{dispatch(closeModal())}} style={{display:"flex"}}>
                <DbSideBar/>
                <Body/>
            </div>
            {openedModal ? <AuthForm/> : null}
        </div>
    );
};

export default Dashboard;