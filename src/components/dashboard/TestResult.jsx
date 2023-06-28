import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import TeacherResult from "./TeacherResult";
import StudentResult from "./StudentResult";
import {auth} from "../../http/user";

const TestResult = () => {
    const token = localStorage.getItem('token')
    const openedModal = useSelector(state => state.modal)
    const isTeacher = localStorage.getItem('isTeacher')
    const dispatch = useDispatch()
    console.log(isTeacher)
    return(
        <div>
            {isTeacher?<TeacherResult/>:<StudentResult/>}
        </div>
    )
};

export default TestResult;