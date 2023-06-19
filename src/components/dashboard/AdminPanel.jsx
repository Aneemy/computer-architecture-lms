import React, {useState} from 'react';
import axios from "axios";
import AuthForm from "../userInterface/AuthForm";
import {useDispatch, useSelector} from "react-redux";
import Header from "../Header";
import {closeModal} from "../../reducers/uiReducer";
import SideBar from "../SideBar";
import Body from "../Body";
import SumInput from "../summators/SumInput";
import {modalStyle} from "../Main";
import DbSideBar from "./DBSideBar";

const AdminPanel = () => {
    const openedModal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const GroupPanel = () =>{
        const [group,setGroup] = useState('')
        return(
            <div>
                <input type="text" value={group} onChange={(e)=>setGroup(e.target.value)}/>
                <div>
                    <div onClick={async ()=>{
                        try {
                            const response = await axios.post('http://192.168.56.101:8080/teacher/'+token+'/group',
                                {name:group})
                        }
                        catch (e) {
                            alert(e.response.data)
                        }
                    }}>
                        Добавить группу
                    </div>
                    <div onClick={async ()=>{
                        try {
                            const response = await axios.post("",
                                {group:group})
                        }
                        catch (e) {
                            alert(e.response.data)
                        }
                    }}>
                        Удалить группу
                    </div>
                    <div onClick={async ()=>{
                        try {
                            const response = await axios.get("",
                                {group:group})
                            console.log(response.data)
                        }
                        catch (e) {
                            alert(e.response.data)
                        }
                    }}>
                        Получить студентов группы
                    </div>
                </div>
            </div>
        )
    }
    const StudentPanel = () =>{
        const [student,setStudent] = useState('')
        return(
            <div>
                <input type="text" value={student} onChange={(e)=>setStudent(e.target.value)}/>
                <div>
                    <div onClick={async ()=>{
                        try {
                            const response = await axios.post("",
                                {name:student})
                        }
                        catch (e) {
                            alert(e.response.data)
                        }
                    }}>
                        Смена группы студента
                    </div>
                    <div onClick={async ()=>{
                        try {
                            const response = await axios.post("",
                                {email:student})
                        }
                        catch (e) {
                            alert(e.response.data)
                        }
                    }}>
                        Удалить студента
                    </div>
                    <div onClick={async ()=>{
                        try {
                            const response = await axios.get("",
                                {email:student})
                            console.log(response.data)
                        }
                        catch (e) {
                            alert(e.response.data)
                        }
                    }}>
                        Получить список тестов
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Header/>
            <div className={openedModal ? modalStyle : null} onClick={()=>{dispatch(closeModal())}} style={{display:"flex",justifyContent:"center"}}>
                <DbSideBar/>
                <Body >
                    <GroupPanel/>
                    <StudentPanel/>
                </Body>
            </div>
            {openedModal ? <AuthForm/> : null}
        </div>
    );
};

export default AdminPanel;