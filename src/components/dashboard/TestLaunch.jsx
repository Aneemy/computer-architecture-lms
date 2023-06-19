import React, {useEffect, useState} from 'react';
import axios from "axios";
import Header from "../Header";
import DbSideBar from "./DBSideBar";
import Body from "../Body";
import {useDispatch, useSelector} from "react-redux";
import {modalStyle} from "../Main";
import {closeModal} from "../../reducers/uiReducer";
import AuthForm from "../userInterface/AuthForm";

const TestLaunch = () => {
    const [testsList,setTestsList] = useState(null)
    const [isReady, setIsReady] = useState(false);
    const [selectedTestIndex, setSelectedTestIndex] = useState(null);
    const now = new Date();
    const [launchTime,setLaunchTime] = useState(now.toLocaleDateString())
    const [duration,setDuration] = useState(0);
    const openedModal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const token = localStorage.getItem("token");

    const getTestsList = async () =>{
            try {
                const response = await axios.get('http://192.168.56.101:8080/teacher/'+token+'/tests')
                console.log(response)
                setTestsList(response.data)
                console.log(response.data)
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
                <div className="tests__list">
                    {testsList.map((test,index)=>{
                        return(
                            <div className="tests__item" onClick={()=>setSelectedTestIndex(index)} key={index}>
                                {test}
                                {selectedTestIndex === index && (
                                    <TestLaunchModal test={test} index={index} />)}
                            </div>
                        )
                    })
                    }
                </div>
            )
        }
    }
    const TestLaunchModal = (props) =>{
        const handleTestSubmit = async () =>{
            try {
                const response = await axios.post('',{
                    test:props.test,
                    start:launchTime,
                    duration:Number(duration)
                }
                )
                console.log(response)
                if (response.status==201){
                    setSelectedTestIndex('')
                    alert('Успешная регистрация')
                }
                else alert("Лечитесь")
            }
            catch (e){
                alert(e)
            }
        }
        return(
            <div className="qc__modal">
                <span onClick={()=>setSelectedTestIndex(0)}>Закрыть</span>
                <h1>Окно запуска теста</h1>
                {props.test}
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
                    <PrintTestsList/>
                </Body>
            </div>
            {openedModal ? <AuthForm/> : null}
        </div>
    );
};

export default TestLaunch;