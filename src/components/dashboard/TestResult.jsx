import React, {useEffect, useState} from 'react';
import axios from "axios";
import Header from "../Header";
import {modalStyle} from "../Main";
import {closeModal} from "../../reducers/uiReducer";
import DbSideBar from "./DBSideBar";
import Body from "../Body";
import AuthForm from "../userInterface/AuthForm";
import {useDispatch, useSelector} from "react-redux";
import {$url} from "../../http/user";
import TeacherResult from "./TeacherResult";
import StudentResult from "./StudentResult";

const TestResult = () => {
    const token = localStorage.getItem('token')
    const openedModal = useSelector(state => state.modal)
    const isTeacher = useSelector(state => state.user.isTeacher)
    const dispatch = useDispatch()

    return(
        <div>
            {isTeacher?<TeacherResult/>:<StudentResult/>}
        </div>
    )
};

export default TestResult;