import React, {useEffect, useState} from 'react';
import Header from "../Header";
import DbSideBar from "./DBSideBar";
import Body from "../Body";
import axios from "axios";
import {question} from "../../http/user";
import AuthForm from "../userInterface/AuthForm";
import {modalStyle} from "../Main";
import {closeModal} from "../../reducers/uiReducer";
import {useDispatch, useSelector} from "react-redux";


const TestConst = () => {
    const [questionList,setQuestionList] = useState(['1','2'])
    const [testList,setTestList] = useState([])
    const [isReady, setIsReady] = useState(false);
    const [questionBodies,setQuestionBodies] = useState([])
    const token = localStorage.getItem("token");
    const openedModal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const requestCurrentQuestion = async (question,index) =>{
        try {
            const response = await axios.get('http://192.168.56.101:8080/teacher/'+token+'/quest/'+question)
            const newArray = [...questionBodies]
            newArray[index] = response.data
            setQuestionBodies(newArray)
        }
        catch (e){
            alert(e)
        }
    }
    const getQuestionList = async () =>{
        try {
            const response = await axios.get('http://192.168.56.101:8080/teacher/'+token+'/quests')
            setQuestionList(response.data)
            const mocha=Object.keys(response.data).length;
            const mocha2=new Array(mocha);
            setQuestionBodies(mocha2);
        }
        catch (e){
            alert(e)
        }
    }
    console.log(testList)
    const sendTest = async (name,list) =>{
        try {
            const response = await axios.post('http://192.168.56.101:8080/teacher/'+token+'/tests',{
                name:name,
                value:list
            })
            if (response.status!=='201') {
                alert("Cool")
            }
            else{
                alert("ad")
            }
        }
        catch (e) {
            alert(e.message)
        }
    }
    useEffect(()=>{
        getQuestionList()
    },[])
    const PrintQuestionList = () =>{
        const getRequiredQuestion = async (question,setQuestion) =>{
            try {
                const response = await axios.get("",
                    {question:question})
                setQuestion(response.data)
            }
            catch (e){
                alert(e.response.message)
            }
        }
        if (questionList!==null){
            return(
                <div className="tests__list">
                    {questionList.map((question,index)=>{
                        // const [currentQuestion,setCurrentQuestion] = useState({
                        //     name:'',
                        //     text:'',
                        //     pictures:[],
                        //     options:[]
                        // })
                        return(
                            <div className="question__item" onClick={()=>prepareTest(question)} key={index}>
                                {question}
                                <span onClick={()=>{requestCurrentQuestion(question,index)}}>Запросить</span>
                                {/*<div>*/}
                                {/*    <span onClick={()=>{getRequiredQuestion(question,setCurrentQuestion)}}>Запросить вопрос</span>*/}
                                {/*    <div>*/}
                                {/*        <span>{currentQuestion.name}</span>*/}
                                {/*        <span>{currentQuestion.text}</span>*/}
                                {/*        <div>*/}
                                {/*            {currentQuestion.pictures.map((picture,index)=>{*/}
                                {/*                return(*/}
                                {/*                    <div>*/}
                                {/*                        <div>*/}
                                {/*                            {picture.picture}*/}
                                {/*                        </div>*/}
                                {/*                        <span>{picture.caption}</span>*/}
                                {/*                    </div>*/}
                                {/*                )*/}
                                {/*            })}*/}
                                {/*        </div>*/}
                                {/*        <div>*/}
                                {/*            {currentQuestion.options.map((option,index)=>{*/}
                                {/*                return(*/}
                                {/*                    <div>*/}
                                {/*                        {option.heading}*/}
                                {/*                    </div>*/}
                                {/*                )*/}
                                {/*            })}*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        )
                    })
                    }
                </div>
            )
        }
    }

    const prepareTest = (question) => {
        if(!testList.includes(question)){
           setTestList([...testList,question])
            }
        else {
            setTestList(testList.filter((quest, index) => quest !== question))
        }
    }
    const NameInput = () => {
        const [name, setName] = useState('');

        const handleSubmit = (event) => {
            event.preventDefault();
        };

        return (
            <div className="qc__modal">
                <span className="qc__xclose" onClick={() => setIsReady(false)}>
                    Закрыть
                </span>
                <div className="quest__list">
                    Состав теста
                    {testList.map((quest,index)=>{
                        return(
                            <div className="question__item" key = {index}>
                                {quest}
                            </div>
                        )
                    })}
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        className="qc__input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                    />
                    <button className="qi__button" type="button" onClick={()=>{
                        sendTest(name,testList)
                    }
                    }>
                        Загрузить тест на сервер
                    </button>
                </form>
            </div>
        );
    };
    return (
        <div>
            <Header />
            <div className={openedModal ? modalStyle : null} onClick={()=>{dispatch(closeModal())}} style={{display:"flex"}}>
                <DbSideBar />
                <Body>
                    <PrintQuestionList/>
                    <button className="qi__button" onClick={() => setIsReady(true)}>
                        Завершить формирование теста
                    </button>
                    {isReady && <NameInput />}
                </Body>
            </div>
            {openedModal ? <AuthForm/> : null}
        </div>
    );
};

export default TestConst;
