import React, {useEffect, useState} from 'react';
import Header from "../Header";
import DbSideBar from "./DBSideBar";
import Body from "../Body";
import axios, {create} from "axios";

const Test = () => {
    const [test,setTest] = useState({name:'',test:[]})
    const [answers,setAnswers] = useState([])
    const requestTest  = async () =>{
        try {
            const response = await axios.get('',{
            },
            )
            setTest({...test,name:response.data.test_name,test: response.data.test})
            localStorage.setItem('test_name',response.data.test_name)
            localStorage.setItem('test',response.data.test)
        }
        catch (e){
            alert(e)
        }
    }
    useEffect(()=>{
        requestTest()
    },[])
    const TestBody = ()=>{
        if(test.test!==[])
            return(
            <div>
                <span>{test.name}</span>
                {test.test.map((question,index)=>{
                    return(
                <TestQuestion question = {question}/>
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
    const TestQuestion = (question) =>{
        const [answer, setAnswer] = useState(null);
        const handleInputChange = (e) => {
            setAnswer(e.target.value);
            handleAnswer(question.name, e.target.value);
        };

        const handleOptionChange = (option) => {
            setAnswer(option);
            handleAnswer(question.name, option);
        };

        const OptionsList = (options) =>{
            if(options!==null){
                options.map((option,index)=>{
                    return(
                        <div onClick={()=>handleOptionChange(option)} key={index}>
                            {option}
                        </div>
                    )
                })
            }
            else
                return(
                    <input type="text" value={answer} onChange={(e)=>handleInputChange(e)}/>
                )
        }
        const ImageList = (images) =>{
            if (images!==null){
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
                <span>{question.name}</span>
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
            <div style={{ display: 'flex' }}>
                <DbSideBar />
                <Body>
                <TestBody/>
                </Body>
            </div>
        </div>
    );
};

export default Test;