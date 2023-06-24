import React, { useEffect, useState } from 'react';
import Header from "../Header";
import DbSideBar from "./DBSideBar";
import Body from "../Body";
import axios from "axios";
import { modalStyle } from "../Main";
import { closeModal } from "../../reducers/uiReducer";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../userInterface/AuthForm";
import {$url} from "../../http/user";
import {useNavigate} from "react-router-dom";

const Test = () => {
    const navigate = useNavigate()
    const [test, setTest] = useState(undefined);
    const [testList, setTestList] = useState(null);
    const [answers, setAnswers] = useState([]);
    const openedModal = useSelector(state => state.modal);
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const [curTest,setCurTest] = useState();
    console.log(answers)

    const requestLaunchedTests = async () => {
        try {
            const response = await axios.get($url+`/student/${token}/tests`);
            console.log(response.data);
            setTestList(response.data);
            let tempArr = [];
        } catch (e) {
            alert(e);
        }
    };

    const requestTest = async (id) => {
        try {
            const response = await axios.get($url+`/student/${token}/${id}`);

            setTest(response.data);
            localStorage.setItem('test', response.data);
            setCurTest(id)
            setTestList(null);
            setCurTest(id)
        } catch (e) {
            alert(e);
        }
    };

    useEffect(() => {
        requestLaunchedTests();
    }, []);
    const TestsList = () =>{
        return(
            <div className="test__testlist">
                {testList.map((test, index) => (
                <div onClick={() => requestTest(test.id)} key={index}>
                    {test.name}
                </div>
            ))}
            </div>
        )
    }
    const TestBody = () => {
        const submitTest = async () =>{
            try {
                const response = await axios.post($url+'/student/'+token+'/'+curTest+'/results',
                    {answers:answers,date_time:new Date()})
                    navigate('/')
            }
            catch (e){
                alert(e)
            }
        }
        if (test !== undefined) {
            return (
                <div className="test__body">
                    <div className="test__questionslist">
                    {test.map((question, index) => (
                        <TestQuestion key={index} question={question} gindex={index} />
                    ))}
                    </div>
                    <button className="test__subbtn" onClick={()=>submitTest()}>Завершить тест</button>
                </div>
            );
        }
    };

    const handleAnswer = (questionId, answerIndex) => {
        const updatedAnswers = [...answers];
        const existingAnswerIndex = updatedAnswers.findIndex(ans => ans.id === questionId);

        if (existingAnswerIndex !== -1) {
            if (test.find(quest => quest.id === questionId) && test.find(quest => quest.id === questionId).options) {
                // Update answer as an array
                const questionAnswers = updatedAnswers[existingAnswerIndex].answers;
                const answerPosition = questionAnswers.indexOf(answerIndex);
                if (answerPosition !== -1) {
                    questionAnswers.splice(answerPosition, 1);
                } else {
                    questionAnswers.push(answerIndex);
                }
            } else {
                updatedAnswers[existingAnswerIndex].answers = answerIndex;
            }
        } else {
            const newAnswer = {
                id: questionId,
                answers: test.find(quest => quest.id === questionId) && test.find(quest => quest.id === questionId).options ? [answerIndex] : answerIndex
            };
            updatedAnswers.push(newAnswer);
        }

        setAnswers(updatedAnswers);
    };

    const TestQuestion = ({ question,gindex }) => {
        const [answer, setAnswer] = useState('');
        useEffect(() => {
            const existingAnswer = answers.find(ans => ans.id === question.id);
            if (existingAnswer) {
                if (Array.isArray(existingAnswer.answers)) {
                    setAnswer(existingAnswer.answers[0]);
                } else {
                    setAnswer(existingAnswer.answers);
                }
            }
        }, [answers, question.id]);

        const handleOptionChange = (option, index) => {
            setAnswer(option);
            handleAnswer(question.id, index);
        };
        const handleInputChange = e => {
            const newAnswer = e.currentTarget.value;
            setAnswer(newAnswer);
            handleAnswer(question.id, newAnswer);
        };

        const OptionsList = ({ options }) => {
            const [babaji,setBabaji] =useState(answer)
            if (options !== undefined && options !== null) {
                return (
                    <div className="test__options__row">
                        {options.map((option, index) => (
                            <div className={`test__option ${answers.some(ans => ans.id === question.id && ans.answers.includes(index)) ? 'selected' : ''}`}
                                 onClick={() => handleOptionChange(option, index)} key={index}>
                                {option.heading}
                            </div>
                        ))}
                    </div>
                );
            } else {
                return (
                    <input
                        type="text"
                        value={babaji}
                        placeholder="Введите ответ"
                        onChange={e => setBabaji(e.currentTarget.value)}
                        onBlur={e => handleInputChange(e)}
                    />
                );
            }
        };
        const ImageList = ({ images }) => {
            if (images !== undefined&&images!==null) {
                return images.map((image, index) => (
                    <div key={index}>
                        <img src={image.img} alt="" />
                        <span>{image.caption}</span>
                    </div>
                ));
            }
        };

        return (
            <div className="test__question">
                <ImageList images={question.pictures} />
                <div>{question.text}</div>
                <OptionsList options={question.options} />
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div
                className={openedModal ? modalStyle : null}
                onClick={() => {
                    dispatch(closeModal());
                }}
                style={{ display: "flex", justifyContent: "center" }}
            >
                <DbSideBar />
                <Body>
                    <div className="test__body">
                    {testList == null ? <TestBody/> : <TestsList/>}
                    </div>
                </Body>
            </div>
            {openedModal ? <AuthForm /> : null}
        </div>
    );
};

export default Test;
