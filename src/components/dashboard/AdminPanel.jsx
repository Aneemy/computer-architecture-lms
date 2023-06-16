import React, {useState} from 'react';
import axios from "axios";

const AdminPanel = () => {
    const [group,setGroup] = useState('')
    const [student,setStudent] = useState('')
    const GroupPanel = () =>{
        return(
            <div>
                <input type="text" value={group} onChange={(e)=>setGroup(e.target.value)}/>
                <div>
                    <div onClick={async ()=>{
                        try {
                            const response = await axios.post("",
                                {group:group})
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
        return(
            <div>
                <input type="text" value={student} onChange={(e)=>setStudent(e.target.value)}/>
                <div>
                    <div onClick={async ()=>{
                        try {
                            const response = await axios.post("",
                                {name:student,group:group})
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
        <GroupPanel/>
            <StudentPanel/>
        </div>
    );
};

export default AdminPanel;