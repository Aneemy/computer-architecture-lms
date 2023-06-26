import React, {useEffect, useState} from 'react';
import Header from "../Header";
import DbSideBar from "./DBSideBar";
import Body from "../Body";
import axios, {options} from "axios";
import {$url, question} from "../../http/user";
import AuthForm from "../userInterface/AuthForm";
import {modalStyle} from "../Main";
import {closeModal} from "../../reducers/uiReducer";
import {useDispatch, useSelector} from "react-redux";
import { Redirect } from 'react-router-dom';

const TestConst = () => {
    const [questionList,setQuestionList] = useState(null)
    const [testList,setTestList] = useState([])
    const [isReady, setIsReady] = useState(false);
    const [questionBodies,setQuestionBodies] = useState([])
    const token = localStorage.getItem("token");
    const openedModal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const requestCurrentQuestion = async (question,index) =>{
        try {
            const response = await axios.get($url+'/teacher/'+token+'/quest/'+question)
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
            const response = await axios.get($url+'/teacher/'+token+'/quests')
            setQuestionList(response.data)
            const arrlength=Object.keys(response.data).length;
            const tempArr=new Array(arrlength);
            setQuestionBodies(tempArr);
        }
        catch (e){
            alert(e)
        }
    }
    const sendTest = async (name,list) =>{
        try {
            const response = await axios.post($url+'/teacher/'+token+'/tests',{
                name:name,
                value:list
            })
            if (response.status!=='201') {
                alert('Вопрос успешно отправлен')
            }
            else{
                alert("Ужас")
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

        if (questionList!==null){
            return(
                <div className="testconst__list">
                    {questionList.map((question,index)=>{
                        return(
                             <Question key={index} index={index} question={question}/>
                        )
                    })
                    }
                </div>
            )
        }
    }
    const prepareTest = (question) => {
        if(!testList.includes(Number(question))){
            setTestList([...testList,Number(question)])
        }
        else {
            setTestList(testList.filter((quest, index) => Number(quest) !== Number(question)))
        }
    }
    const Question = ({question,index}) =>{
        return(
            <div key={index} className="testconst__quest">
                <div className={testList.includes(Number(question.id))?"testconst__item selected":"testconst__item"} onClick={()=>prepareTest(question.id)} key={index}>
                    {question.name}
                    <span onClick={()=>{requestCurrentQuestion(question.id,index)}}>Запросить</span>
                </div>
                <QuestionBody index={index}/>
            </div>
        )
    }
    const QuestionBody = props =>{
        const PicturesRow = ({array})=>{
            if (array!==null)
                return(
                    <div>
                        {array.map((picture,index)=>{
                            return(
                                <div>
                                    <div>
                                        <img src={picture.img} alt=""/>
                                    </div>
                                    <span>{picture.caption}</span>
                                </div>
                            )
                        })}
                    </div>
                )
        }
        const OptionsRow = ({options})=>{
            if (options!==undefined&&options!==null)
                return(
                    <div>
                        <span>Варианты ответа:</span>
                        <div className="testconst__row">
                        {options.map((option,index)=>{
                        return(
                            <div key={index} style={option.isTrue ? {textDecoration:"underline"}:null}>
                                {option.heading}
                            </div>
                        )
                        })
                        }
                        </div>
                    </div>
                )
            else
                return (
                    <div>
                        Со свободным ответом
                    </div>
                )
        }
        if (questionBodies[props.index]!==undefined)
        return(
            <div className="testconst__content">
                <span><span style={{fontStyle:"italic"}}>Формулировка:</span> {questionBodies[props.index].text}</span>
                <PicturesRow array = {questionBodies[props.index].pictures}/>
                <OptionsRow options = {questionBodies[props.index].options}/>
            </div>
        )
    }
    const NameInput = () => {
        const [name, setName] = useState('');

        const handleSubmit = () => {
            if (testList.length!==0&&name.trim()!=='')
                sendTest(name,testList)
            else alert('Название не введено или тест пуст')
        };
        return (
            <div className="testconst__modal">
                <span className="testconst__xclose" onClick={() => setIsReady(false)}>
                    Закрыть
                </span>
                <div className="testconst__list">
                    Состав теста
                    {testList.map((quest,index)=>{
                        return(
                            <div className="testconst__quest testconst__item" key = {index}>
                                {quest}
                            </div>
                        )
                    })}
                </div>
                <form className="testconst__form">
                    <input
                        className="testconst__input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Введите название теста"
                    />
                    <button onClick={()=>handleSubmit()} className="testconst__button" type="button">
                        Загрузить тест на сервер
                    </button>
                </form>
            </div>
        );
    };
    return (
        <div>
            <Header />
            <div className={openedModal ? modalStyle : null} onClick={()=>{dispatch(closeModal())}} style={{display:"flex",justifyContent:"center"}}>
                <DbSideBar />
                <Body >
                    <div className={isReady ? "modal__opened testconst__body" : "testconst__body"} >
                        <PrintQuestionList/>
                        <button className="testconst__button" onClick={() => setIsReady(true)}>
                            Завершить формирование теста
                        </button>
                    </div>
                    {isReady && <NameInput />}
                </Body>
            </div>
            {openedModal ? <AuthForm/> : null}
        </div>
    );
};

export default TestConst;
