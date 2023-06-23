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
        const TestList = () =>{
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
                            <TestList/>
                        </div>
                    </Body>
                </div>
                {openedModal ? <AuthForm/> : null}
            </div>
        );
    }
    const TeacherResult = () =>{
        const [testsList,setTestsList] = useState(null)
        const [ulist,setUList] = useState(null)
        const [curTest,setCurTest] = useState(null)
        const [testsDisplay,setTestsDisplay] = useState(true)
        const getUncheckedTests = async () =>{
            try {
                const response = await axios.get($url+'/'+token+'/test/check')
                setTestsList(response.data)
            }
            catch (e){
                alert(e)
            }
        }
        useEffect(()=>{
            getUncheckedTests()
        },)
        const getUncheckedTest = async (id)=>{
            try {
                const response = await axios.get($url+'/teacher/'+token+'/'+id +'results')
                setUList(response.data)
                setCurTest(id)
                setTestsDisplay(false)
            }
            catch (e){
                alert(e)
            }
        }

        const PrintTestsList = () =>{
            return(
                <div>
                    {testsList.map((quest,index)=>{
                        return(
                            <div onClick={()=>getUncheckedTest(quest.id)}>
                                {quest.name}
                            </div>
                        )
                    })}
                </div>
            )
        }
        const PrintUList = () =>{
            const Student = ({student}) =>{
                const submitStudent = async ()=>{
                    try {
                        const response = await axios.post($url+'/teacher/'+token+'/student/'+curTest+'/choose/results',{
                            email:student.email,
                            estimation:estimation,
                            score:score
                        })
                    }
                    catch (e){
                        alert(e)
                    }
                }
                let estimation =  student.answers.map((answer,index)=>{
                    return false
                })
                const [score,setScore] =useState('')
                const handleAnswer = (index) =>{
                    if (estimation[index]===false)
                        estimation[index] = true
                    else
                        estimation[index] = false
                }
                return(
                    <div>
                        <span>{student.email}</span>
                        <div>
                            {student.answers.quest.map((quest,index)=>{
                                return(
                                    <div>
                                        <span>{quest.text}</span>
                                        <span onClick={()=>handleAnswer(index)}>{quest.answer}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <input value={score} onChange={(e)=>setScore(e.currentTarget.value)} type="text" placeholder="Введите оценку"/>
                        <button onClick={()=>submitStudent()}> Отправить в ад</button>
                    </div>
                )
            }
            if (ulist!==null)
                return(
                    <div>
                        {
                            ulist.map((student,index)=>{
                                return(
                                <Student student={student}/>
                                )})
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
    }




    return(
        <div>
            {isTeacher?<TeacherResult/>:<StudentResult/>}
        </div>
    )
};

export default TestResult;