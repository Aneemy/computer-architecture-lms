import React, {useEffect, useState} from 'react';
import axios from "axios";
import {$url} from "../../http/user";
import Header from "../Header";
import {modalStyle} from "../Main";
import {closeModal} from "../../reducers/uiReducer";
import DbSideBar from "./DBSideBar";
import Body from "../Body";
import AuthForm from "../userInterface/AuthForm";
import {useDispatch, useSelector} from "react-redux";

const TeacherResult = () => {
    const [testsList,setTestsList] = useState(null)
    const [ulist,setUList] = useState(null)
    const [curTest,setCurTest] = useState(null)
    const [testsDisplay,setTestsDisplay] = useState(true)
    const token = localStorage.getItem('token')
    const openedModal = useSelector(state => state.modal)
    const isTeacher = useSelector(state => state.user.isTeacher)
    const dispatch = useDispatch()
    const getUncheckedTests = async () =>{
        try {
            const response = await axios.get(`${$url}/teacher/${token}/tests/check`)
            setTestsList(response.data)
        }
        catch (e){
            alert(e)
        }
    }
    useEffect((()=>{
        getUncheckedTests()
    }),[])
    const getUncheckedTest = async (id)=>{
        try {
            const response = await axios.get($url+'/teacher/'+token+'/'+id +'/choose')
            setUList(response.data)
            setCurTest(id)
            console.log(response.data)
            setTestsDisplay(false)
        }
        catch (e){
            alert(e)
        }
    }

    const PrintTestsList = () =>{
        if (testsList!==null)
            return(
                <div>
                    {testsList.map((quest,index)=>{
                        return(
                            <div key = {index} onClick={()=>getUncheckedTest(quest.id)}>
                                {quest.name}
                            </div>
                        )
                    })}
                </div>
            )
    }
    const PrintUList = () => {
        const Student = ({student}) => {
            const submitStudent = async () => {
                try {
                    const response = await axios.post($url + '/teacher/' + token + '/student/' + curTest + '/choose/results', {
                        email: student.email,
                        estimation: estimation,
                        score: Number(score)
                    })
                } catch (e) {
                    alert(e)
                }
            }
            let estimation = student.answers.map((answer, index) => {
                return false
            })
            const [score, setScore] = useState('')
            const handleAnswer = (index) => {
                if (estimation[index] === false)
                    estimation[index] = true
                else
                    estimation[index] = false
            }
            return (
                <div>
                    <span>{student.email}</span>
                    <div>
                        {student.answers.map((quest, index) => {
                            console.log(quest.answer)
                            return (
                                <div>
                                    <span>{quest.quest.text}</span>
                                    <span onClick={() => handleAnswer(index)}>{quest.answer}</span>
                                </div>
                            )
                        })}
                    </div>
                    <input value={score} onChange={(e) => setScore(e.currentTarget.value)} type="text"
                           placeholder="Введите оценку"/>
                    <button onClick={() => submitStudent()}> Отправить в ад</button>
                </div>
            )
        }
        if (ulist !== null)
            return (
                <div>
                    {
                        ulist.map((student, index) => {
                            return (
                                <Student student={student}/>
                            )
                        })
                    }
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
                            {testsDisplay&&<PrintTestsList/>}
                            {!testsDisplay&&<PrintUList/>}
                        </div>
                    </Body>
                </div>
                {openedModal ? <AuthForm/> : null}
            </div>
        )
};

export default TeacherResult;