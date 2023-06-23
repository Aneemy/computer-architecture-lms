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

const TestResult = () => {
    const token = localStorage.getItem('token')
    const openedModal = useSelector(state => state.modal)
    const isTeacher = useSelector(state => state.user.isTeacher)
    const dispatch = useDispatch()
    const StudentResult = () =>{
        const [testsList,setTestLists] = useState(null)
        const [curTest,setCurTest] = useState([])
        const studentTestsRequest = async (email) =>{
            try {
                const response = await axios.get($url+'/student/'+token+'/completed')
                setTestLists(response.data)
                const length = response.data.length;
                const array = new Array(length)
                setCurTest(array)
            }
            catch (e){
                alert(e)
            }
        }
        useEffect(()=>{
            studentTestsRequest(token)
        },[])
        const TestsList = () =>{
            const getQuestionsList = async () =>{
                try {
                    const response = await axios.get($url+'/teacher/'+token+'/1/1/choose')
                    console.log(response.data)
                }
                catch (e){
                    alert(e)
                }
            }
            useEffect((()=>{getQuestionsList()}),[])
            const TestBody = ({index}) =>{
                if (curTest[index]!==undefined)
                    return(
                        <div className="testresult__result">
                            {curTest[index].test.map((question,index)=>{
                                return(
                                    <div key={index}>
                                        <span>{question.text}</span>
                                        <div>
                                            {question.pictures===undefined ? null:question.pictures.map((picture,index)=>{
                                                return(
                                                    <div key={index}>
                                                        {picture.img}
                                                        {picture.caption}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div>
                                            {question.answers===undefined ? null:question.answers.map((answer,index)=>{
                                                return(
                                                    <div key={index}>
                                                        {answer.heading}
                                                        {answer.isTrue}
                                                        {answer.isSelected}
                                                        {answer.text}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>)
                            })}
                            {curTest[index].score}
                        </div>
                    )
            }
            const studentTestRequest = async (id,index) =>{
                try {
                    const response = await axios.get($url+'/student/'+token+'/'+id+'/results')
                    console.log(response)
                    let temparr = curTest;
                    temparr[index] = response.data;
                    setCurTest(temparr)
                }
                catch (e){
                    alert(e)
                }
            }
            if (testsList!==null)
                return(
                    <div className="testresult__table">
                        {testsList.map((test,index)=>{
                            return(
                                <div key={index} className="testresult__row">
                                    <div>
                                        {test.name}
                                        <span>{test.date_time}</span>
                                        <div onClick={()=>studentTestRequest(test.id,index)}>
                                            Запросить тест
                                        </div>
                                    </div>
                                    <TestBody index={index}/>
                                </div>
                            )
                        })}
                    </div>
                )
        }
        return (
            <div>
                <Header/>
                <div className={openedModal ? modalStyle : null} onClick={()=>{dispatch(closeModal())}} style={{display:"flex",justifyContent:"center"}}>
                    <DbSideBar/>
                    <Body >
                        <div className="testresult__body">
                            <TestsList/>
                        </div>
                    </Body>
                </div>
                {openedModal ? <AuthForm/> : null}
            </div>
        );
    }
    const TeacherResult = () =>{

        return (
            <div>
                <Header/>
                <div className={openedModal ? modalStyle : null} onClick={()=>{dispatch(closeModal())}} style={{display:"flex",justifyContent:"center"}}>
                    <DbSideBar/>
                    <Body >
                        <div className="testresult__body">
                        </div>
                    </Body>
                </div>
                {openedModal ? <AuthForm/> : null}
            </div>
        )
    }
    return(
        <div>
            {isTeacher?<TeacherResult/>:<StudentResult/>}
        </div>
    )
};

export default TestResult;