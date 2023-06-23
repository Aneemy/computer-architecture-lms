import React, {useEffect, useState} from 'react';
import axios from "axios";
import Header from "../Header";
import DbSideBar from "./DBSideBar";
import Body from "../Body";
import {useDispatch, useSelector} from "react-redux";
import {modalStyle} from "../Main";
import {closeModal} from "../../reducers/uiReducer";
import AuthForm from "../userInterface/AuthForm";
import {type} from "@testing-library/user-event/dist/type";
import {$url} from "../../http/user";

const TestLaunch = () => {
    const [testsList,setTestsList] = useState(null)
    const [selectedTestIndex, setSelectedTestIndex] = useState(null);
    const openedModal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const token = localStorage.getItem("token");
    const getTestsList = async () =>{
            try {
                const response = await axios.get($url+'/teacher/'+token+'/tests')
                setTestsList(response.data)
            }
            catch (e){
                alert(e)
            }
    }
    useEffect(()=>{
        getTestsList()
    },[])
    const PrintTestsList = () =>{

        if (testsList!==null){
            return(
                <div className="testlaunch__list">
                    Перечень всех существующих тестов:
                    {testsList.map((test,index)=>{
                        return(
                            <div className="testlaunch__question" onClick={()=>setSelectedTestIndex(index)} key={index}>
                                {test.name}
                            </div>
                        )
                    })
                    }
                </div>
            )
        }
    }
    const TestLaunchModal = () =>{
        const now = new Date();
        const [launchTime,setLaunchTime] = useState(now.toLocaleDateString())
        const [duration,setDuration] = useState(0);

        const handleTestSubmit = async () =>{
            try {
                const response = await axios.post($url+'/teacher/'+token+'/'+testsList[selectedTestIndex].id,{
                    name:testsList[selectedTestIndex].name,
                    start:launchTime,
                    duration:duration
                }
                )
                console.log(response)
                if (response.status==200){
                    setSelectedTestIndex(null)
                    alert('Тест настроен')
                }
            }
            catch (e){
                console.log(e.response)
            }
        }
        return(
            <div className="testlaunch__modal">
                <span className="testlaunch__xclose" onClick={()=>setSelectedTestIndex(null)}>Закрыть</span>
                <span>Окно запуска теста</span>
                 Тест: {testsList[selectedTestIndex].name}
                <span>Выберите время начала теста</span>
                <input value={launchTime} onChange={(e)=>setLaunchTime(e.target.value)} type="datetime-local"/>
                <span>Введите продолжительность теста в минутах</span>
                <input value={duration} onChange={(e)=>setDuration(e.target.value)} type="text"/>
                <span onClick={()=>handleTestSubmit()}> Запустить тест </span>
            </div>
        )
    }
    return (
        <div>
            <Header />
            <div className={openedModal ? modalStyle : null} onClick={()=>{dispatch(closeModal())}} style={{display:"flex",justifyContent:"center"}}>
                <DbSideBar />
                <Body>
                    <div className={selectedTestIndex!==null ? "modal__opened testlaunch__body" :"testlaunch__body"}>
                    <PrintTestsList/>
                    </div>
                    {selectedTestIndex!==null&&<TestLaunchModal/>}
                </Body>
            </div>
            {openedModal ? <AuthForm/> : null}
        </div>
    );
};

export default TestLaunch;