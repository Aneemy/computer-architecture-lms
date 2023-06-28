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
            console.log(response.data)
            setTestsList(response.data)
        }
        catch (e){
            alert(e)
        }
    }
    useEffect((()=>{
        if(isTeacher&&token)
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
        const [currentStudent,setCurrentStudent] = useState(0)
        const Student = ({student}) => {
            const  [currentQuestion,setCurrentQuestion] = useState(0)
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
            const Question = ({question,index}) =>{
                return (
                    <div>
                        <span>{question.quest.text}</span>
                        <span onClick={() => handleAnswer(index)}>{question.answer}</span>
                    </div>
                )
            }
            return (
                <div>
                    <span>{student.email}</span>
                    <div>
                        <Question question={student.answers[currentQuestion]} index={currentQuestion}/>
                    </div>
                    <div className="teacherresult__buttons">
                        {currentQuestion!==0&&<div onClick={()=>setCurrentQuestion(currentQuestion-1)}>
                            Назад
                        </div>}
                        {currentQuestion!==student.answers.length-1&&<div onClick={()=>setCurrentQuestion(currentQuestion+1)}>
                            Вперед
                        </div>}
                    </div>
                    {currentQuestion===student.answers.length-1&&
                        <div>
                        <input value={score} onChange={(e) => setScore(e.currentTarget.value)} type="text"
                           placeholder="Введите оценку"/>
                    <button onClick={() => submitStudent()}> Отправить в ад</button>
                        </div>}
                </div>
            )
        }
        if (ulist !== null)
            return (
                <div>
                    <Student student={ulist[currentStudent]}/>
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