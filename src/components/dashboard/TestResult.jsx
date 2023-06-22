import React, {useEffect, useState} from 'react';
import axios from "axios";
import Header from "../Header";
import {modalStyle} from "../Main";
import {closeModal} from "../../reducers/uiReducer";
import DbSideBar from "./DBSideBar";
import Body from "../Body";
import AuthForm from "../userInterface/AuthForm";
import {useDispatch, useSelector} from "react-redux";

const TestResult = () => {
    const [testsList,setTestLists] = useState([{id:1,name:"хуй"},{id:1,name:"хуй"}])
    const [curTest,setCurTest] = useState([])
    const token = localStorage.getItem('token')
    const openedModal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const studentTestsRequest = async (email) =>{
        try {
            const response = await axios.get('')
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
    const TestsList = () =>{

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
                const response = await axios.get('')
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
                        <TestsList/>
                    </div>
                </Body>
            </div>
            {openedModal ? <AuthForm/> : null}
        </div>
    );
};

export default TestResult;