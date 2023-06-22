import React, {useEffect, useState} from 'react';
import Header from "../Header";
import DbSideBar from "./DBSideBar";
import Body from "../Body";
import axios, {create} from "axios";
import {modalStyle} from "../Main";
import {closeModal} from "../../reducers/uiReducer";
import {useDispatch, useSelector} from "react-redux";
import AuthForm from "../userInterface/AuthForm";
import {notInitialized} from "react-redux/es/utils/useSyncExternalStore";
import {question} from "../../http/user";

const Test = () => {
    const [test,setTest] = useState([{id:'1',text:'123',options:[{heading:'1',isTrue:false},{heading:'2',isTrue:false},{heading:'3',isTrue:true}]},
        {id:'2',text:'123321',options:[{heading:'4',isTrue:false},{heading:'5',isTrue:true},{heading:'3',isTrue:true}]},
        {id:'3',text:'123321123321',options:null}])
    const [testList,setTestList] = useState(null)
    const [answers,setAnswers] = useState([])
    const openedModal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const requestLaunchedTests = async () =>{
        try {
            const response = await axios.get('http://192.168.56.101:8080/student/'+token+'/tests')
            console.log(response.data)
            setTestList(response.data)
            let tempArr = [];
        }
        catch (e) {
            alert(e)
        }
    }
    const requestTest  = async (id) =>{
        try {
            const response = await axios.get('http://192.168.56.101:8080/student/'+token+'/'+id)
            setTest(response.data)
            localStorage.setItem('test',response.data)
            setTestList(null)
        }
        catch (e){
            alert(e)
        }
    }
    useEffect(()=>{
        requestLaunchedTests()},[])
    const TestBody = ()=>{
        if(test!==undefined)
            return(
            <div>
                {test.map((question,index)=>{
                    return(
                <TestQuestion key = {index} question = {question}/>
                    )})}
            </div>
        )
    }
    const handleAnswer = (questionName, answer) => {
        const updatedAnswers = [...answers];
        const existingAnswerIndex = updatedAnswers.findIndex((ans) => ans.question === questionName);

        if (existingAnswerIndex !== -1) {
            updatedAnswers[existingAnswerIndex].answer = answer;
        } else {
            updatedAnswers.push({ question: questionName, answer: answer });
        }

        setAnswers(updatedAnswers);
    };
    const TestQuestion = ({question}) =>{
        const [answer, setAnswer] = useState('');
        const handleInputChange = (e) => {
            setAnswer(e.target.value);
            handleAnswer(question.name, e.target.value);
        };

        const handleOptionChange = (option) => {
            setAnswer(option);
            handleAnswer(question.name, option);
        };

        const OptionsList = ({options}) =>{
            if(options!==undefined&&options!==null){
                return (
                    <div>
                        {options.map((option,index)=>{
                    return(
                        <div onClick={()=>handleOptionChange(option)} key={index}>
                            {option.heading}
                        </div>
                    )
                })
                        }
                    </div>)}
            else
                return(
                    <input type="text" value={answer} onChange={(e)=>handleInputChange(e)}/>
                )
        }
        const ImageList = ({images}) =>{
            if (images!==undefined){
                images.map((image,index)=>{
                    return(
                        <div key={index}>
                            <img src={image.img} alt=""/>
                            <span>{image.caption}</span>
                        </div>
                    )
                })
            }
        }
        return(
            <div >
                <span>{question.id}</span>
                <ImageList images = {question.pictures}/>
                <div>
                    {question.text}
                </div>
                <OptionsList options = {question.options}/>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className={openedModal ? modalStyle : null} onClick={()=>{dispatch(closeModal())}} style={{display:"flex",justifyContent:"center"}}>
                <DbSideBar />
                <Body>
                <TestBody/>
                    {testList==null?null:testList.map((test,index)=>{
                    return(
                        <div onClick={()=>{requestTest(test.id)
                        }
                        } key={index}>
                            {test.test_name}
                        </div>
                    )})
                    }
                </Body>
            </div>
            {openedModal ? <AuthForm/> : null}
        </div>
    );
};

export default Test;