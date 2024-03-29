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
import PicturesRow from "./PicturesRow";

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
            console.log(response.data)
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
            console.log(response.data)
            setCurTest(id)
            setTestsDisplay(false)
        }
        catch (e){
            alert(e)
        }
    }

    const PrintTestsList = () =>{
        if (testsList!==null)
            return(
                <div className="result__testlist">
                    {testsList.map((quest,index)=>{
                        return(
                            <div className="result__test" key = {index} onClick={()=>getUncheckedTest(quest.id)}>
                                {quest.name}
                            </div>
                        )
                    })}
                </div>
            )
    }
    const PrintUList = () => {
        const [currentStudent,setCurrentStudent] = useState(0)
        const Student = ({student,test}) => {
            const  [currentQuestion,setCurrentQuestion] = useState(0)
            const submitStudent = async () => {
                const filteredEstimation = estimation.filter(
                    (item) => test[item.index].options === null
                ).map((item)=>{return item.answer});
                try {
                    const response = await axios.post($url + '/teacher/' + token + '/student/' + student.id + '/choose/results', {
                        estimation: filteredEstimation,
                        score: Number(score)
                    })
                    console.log(response)
                    if (response.status === '200'){
                        setUList(prev => prev.filter((item)=>item===currentStudent))
                        setCurrentQuestion(currentQuestion-1)
                    }
                } catch (e) {
                    alert(e)
                    console.log(e)
                }
            }
            const [estimation,setEstimation] = useState(test.map((ans,index) => {
                return {index:index,answer:false}}))
            console.log(test)
            const [score, setScore] = useState('')
            console.log('123',estimation)
            const handleAnswer = (index) => {
                let tempArr = [...estimation]
                if (tempArr[index].answer === false)
                    tempArr[index].answer = true
                else
                    tempArr[index].answer = false
                setEstimation(tempArr)
            }
            const Question = ({question,index,eindex}) =>{
                return (
                    <div className="teacherresult__answer">
                        <span >Формулировка вопроса: <span style={{textDecoration:'underline'}}>{question.text}</span></span>
                        <PicturesRow gindex = {index} array = {question.pictures}/>
                        <div onClick={() => handleAnswer(index)}>
                        <div>Ответ на вопрос:</div>
                            <div style={{textDecoration:'underline', color:`${estimation[index].answer?'green':'red'}`}}>
                                {typeof student.answers[index] === 'string'?student.answers[index]:
                                    student.answers[index].map((answer)=>{
                                        return(
                                            <div style={{color:"#004d68"}}>
                                                {question.options[answer].heading}
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>
                )
            }
            return (
                <div className="teacherresult__student">
                    <span> Имя студента: <span style={{textDecoration:'underline'}}>{student.email}</span></span>
                    <div>
                        <Question question={test[currentQuestion]} index={currentQuestion}/>
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
                        <div className="teacherresult__submit">
                        <input value={score} onChange={(e) => setScore(e.currentTarget.value)} type="text"
                           placeholder="Введите оценку"/>
                    <div onClick={() => submitStudent()}> Выставить оценку</div>
                        </div>}
                </div>
            )
        }
        if (ulist !== null)
            return (
                <div className="teacherresult__box">
                    <Student student={ulist.students[currentStudent]} test = {ulist.test}/>
                    <div className="teacherresult__buttons">
                        {currentStudent!==0&&<div onClick={()=>setCurrentStudent(currentStudent-1)}>
                            Предыдущий студент
                        </div>}
                        {currentStudent!==ulist.students.length-1&&<div onClick={()=>setCurrentStudent(currentStudent+1)}>
                            Следующий студент
                        </div>}
                    </div>
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