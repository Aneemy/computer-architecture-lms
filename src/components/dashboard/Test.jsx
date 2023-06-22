import React, { useEffect, useState } from 'react';
import Header from "../Header";
import DbSideBar from "./DBSideBar";
import Body from "../Body";
import axios from "axios";
import { modalStyle } from "../Main";
import { closeModal } from "../../reducers/uiReducer";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../userInterface/AuthForm";

const Test = () => {
    const [test, setTest] = useState([
        {
            id: '1',
            text: '123',
            options: [
                { heading: '1', isTrue: false },
                { heading: '2', isTrue: false },
                { heading: '3', isTrue: true }
            ]
        },
        {
            id: '2',
            text: '123321',
            options: [
                { heading: '4', isTrue: false },
                { heading: '5', isTrue: true },
                { heading: '3', isTrue: true }
            ]
        },
        {
            id: '5',
            text: '123321123321',
            options: null
        }
    ]);
    const [testList, setTestList] = useState(null);
    const [answers, setAnswers] = useState([]);
    const openedModal = useSelector(state => state.modal);
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const [curTest,setCurTest] = useState();

    const requestLaunchedTests = async () => {
        try {
            const response = await axios.get(`http://192.168.56.101:8080/student/${token}/tests`);
            console.log(response.data);
            setTestList(response.data);
            let tempArr = [];
        } catch (e) {
            alert(e);
        }
    };

    const requestTest = async (id) => {
        try {
            const response = await axios.get(`http://192.168.56.101:8080/student/${token}/${id}`);
            setTest(response.data);
            localStorage.setItem('test', response.data);
            setTestList(null);
        } catch (e) {
            alert(e);
        }
    };

    useEffect(() => {
        requestLaunchedTests();
    }, []);

    const TestBody = () => {
        const submitTest = async () =>{
            try {
                const response = await axios.post('http://192.168.56.101:8080/student/'+token+'/'+curTest+'/results',
                    {answers:answers,dateTime:new Date()})
                console.log(response.data)
            }
            catch (e){
                alert(e)
            }
        }
        console.log(answers);
        if (test !== undefined) {
            return (
                <div>
                    <div>
                    {test.map((question, index) => (
                        <TestQuestion key={index} question={question} />
                    ))}
                    </div>
                    <button onClick={()=>submitTest()}>Князь гей</button>
                </div>
            );
        }
    };

    const handleAnswer = (questionId, answerIndex) => {
        const updatedAnswers = [...answers];
        const existingAnswerIndex = updatedAnswers.findIndex(ans => ans.id === questionId);

        if (existingAnswerIndex !== -1) {
            if (test[questionId - 1] && test[questionId - 1].options) {
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
                answers: test[questionId - 1] && test[questionId - 1].options ? [answerIndex] : answerIndex
            };
            updatedAnswers.push(newAnswer);
        }

        setAnswers(updatedAnswers);
    };




    const TestQuestion = ({ question }) => {
        const [answer, setAnswer] = useState('');
        useEffect(() => {
            const existingAnswer = answers.find(ans => ans.id === question.id);
            if (existingAnswer) {
                if (Array.isArray(existingAnswer.answers)) {
                    // Set initial answer for options as an array
                    setAnswer(existingAnswer.answers[0]);
                } else {
                    // Set initial answer for input as a string
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
                    <div>
                        {options.map((option, index) => (
                            <div onClick={() => handleOptionChange(option, index)} key={index}>
                                {option.heading}
                            </div>
                        ))}
                    </div>
                );
            } else {
                return (
                    <div>
                    <input
                        type="text"
                        value={babaji}
                        onChange={e => setBabaji(e.currentTarget.value)}
                        onBlur={e => handleInputChange(e)}
                    />
                    </div>
                );
            }
        };




        const ImageList = ({ images }) => {
            if (images !== undefined) {
                return images.map((image, index) => (
                    <div key={index}>
                        <img src={image.img} alt="" />
                        <span>{image.caption}</span>
                    </div>
                ));
            }
        };

        return (
            <div>
                <span>{question.id}</span>
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
                    <TestBody />
                    {testList == null
                        ? null
                        : testList.map((test, index) => (
                            <div onClick={() => requestTest(test.id)} key={index}>
                                {test.test_name}
                            </div>
                        ))}
                </Body>
            </div>
            {openedModal ? <AuthForm /> : null}
        </div>
    );
};

export default Test;
