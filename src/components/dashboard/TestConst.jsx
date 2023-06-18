import React, {useEffect, useState} from 'react';
import Header from "../Header";
import DbSideBar from "./DBSideBar";
import Body from "../Body";
import axios from "axios";
import {question} from "../../http/user";


const TestConst = () => {
    const [questionList,setQuestionList] = useState(null)
    const [testList,setTestList] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const getQuestionList = async () =>{
        return async () => {
            try {
                const response = await axios.get("", {})
                setQuestionList(response.data)
                console.log(response.data)
            }
            catch (e){
                alert(e)
            }
        }
    }
    const sendTest = async (name,list) =>{
        try {
            const response = await axios.post('',{
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
                <div>
                    {questionList.map((question,index)=>{
                        // const [currentQuestion,setCurrentQuestion] = useState({
                        //     name:'',
                        //     text:'',
                        //     pictures:[],
                        //     options:[]
                        // })
                        return(
                            <div onClick={(question)=>prepareTest(question)} key={index}>
                                {question.name}
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
        if(testList.includes(question))
            testList.push(question)
        else setTestList(testList.filter((quest,index)=>quest!==question))
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
            <div style={{ display: 'flex' }}>
                <DbSideBar />
                <Body>
                    <PrintQuestionList/>
                    <button className="qi__button" onClick={() => setIsReady(true)}>
                        Завершить формирование теста
                    </button>
                    {isReady && <NameInput />}
                </Body>
            </div>
        </div>
    );
};

export default TestConst;
