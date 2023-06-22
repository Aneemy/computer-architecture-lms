import React, {useEffect, useState} from 'react';
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
import {question} from "../../http/user";

const AdminPanel = () => {
    const openedModal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const [studentsList,setStudentsList] = useState(null)
    let tempStudentsList = [{name:'Сергей',surname:'Зверев',secondname:'Хуесосович',email:"Piska@gmail.com"},
        {name:'Сергей',surname:'Зверев',secondname:'Хуесосович',email:"Piska@gmail.com"},{name:'Сергей',surname:'Зверев',secondname:'Хуесосович',email:"Piska@gmail.com"}]
    let tempTestsList = [{id:1,name:"хуй"},{id:1,name:"хуй"}]
    let tempGroupsList = null
    const [testsList,setTestLists] = useState(null)
    const [groupsList,setGroupsList] = useState(null)
    const [groupFlag,setGroupFlag] = useState(false)
    const [curTest,setCurTest] = useState([])
    const [curMail,setCurMail] = useState('')
    const studentTestsRequest = async (email) =>{
        try {
            const response = await axios.get('http://192.168.56.101:8080/teacher/'+token+'/student/'+email+'/tests')
            setTestLists(response.data)
            const length = response.data.length;
            const array = new Array(length)
            setCurTest(array)
            setCurMail(email)
        }
        catch (e){
            alert(e)
        }
    }
    const studentsListRequest = async (group) =>{
        try {
            let temp;
             groupsList.map((grouppa,index)=>{
                if (grouppa.name === group){
                    temp = grouppa.id
                }
            })
            const response = await axios.get('http://192.168.56.101:8080/teacher/'+token+'/group/'+temp)
            console.log(response.data)
            setStudentsList(response.data)
        }
        catch (e) {
            alert(e.response)
        }
    }
    const getGroupsList = async () =>{
        try {
            const response = await axios.get('http://192.168.56.101:8080/teacher/'+token+'/groups')
            console.log(response.data)
            setGroupsList(response.data)
        }
        catch (e) {
            alert(e.response.data)
        }
    }
    const GroupPanel = () =>{
        const [data1,setData1] = useState('')
        const [data2,setData2] = useState('')
        const [data3,setData3] = useState('')
        return(
            <div className="adminpanel__group">
                <div className="adminpanel__element">
                <input placeholder="Введите группу" className="adminpanel__input" type="text" value={data1} onChange={(e)=>setData1(e.target.value)}/>
                <div>
                    <div onClick={async ()=>{
                        if (data1.trim() === '') {
                            alert('Проверьте правильность введенных данных');
                            return;
                        }
                        try {
                            const response = await axios.post('http://192.168.56.101:8080/teacher/'+token+'/groups',
                                {name:data1})
                        }
                        catch (e) {
                            alert(e.response.data)
                        }
                    }}>
                        Добавить группу
                    </div>
                </div>
                </div>
                <div className="adminpanel__element">
                    <input placeholder="Введите группу" className="adminpanel__input" type="text" value={data2} onChange={(e)=>setData2(e.target.value)}/>
                    <div>
                        <div onClick={async ()=>{
                            if (data2.trim() === '') {
                                alert('Проверьте правильность введенных данных');
                                return;
                            }
                            try {
                                let gId;
                                groupsList.map((grouppa,index)=>{
                                    if (grouppa.name === data2){
                                        gId = grouppa.id
                                    }
                                })
                                const response = await axios.delete('http://192.168.56.101:8080/teacher/'+token+'/group/'+gId)
                            }
                            catch (e) {
                                alert(e.response.data)
                            }
                        }}>
                            Удалить группу
                        </div>
                    </div>
                </div>
                <div className="adminpanel__element">
                    <input placeholder="Введите группу" className="adminpanel__input" type="text" value={data3} onChange={(e)=>setData3(e.target.value)}/>
                    <div>
                        <div onClick={async ()=>{
                            if (data3.trim() === '') {
                                alert('Проверьте правильность введенных данных');
                                return;
                            }
                            studentsListRequest(data3)
                        }}>
                            Получить список студентов группы
                        </div>
                    </div>
                </div>
                <div className="adminpanel__element">
                    <div>
                        <div onClick={()=>setGroupFlag(!groupFlag)}>
                            {!groupFlag ? 'Получить список групп' : 'Закрыть список групп'}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const StudentPanel = () =>{
        const [data1,setData1] = useState('')
        const [data2,setData2] = useState('')
        const [data3,setData3] = useState('')
        const [data4,setData4] = useState('')
        return(
            <div className="adminpanel__group">
                <div className="adminpanel__element">
                    <input  placeholder="Введите email студента" className="adminpanel__input" type="text" value={data1} onChange={(e)=>setData1(e.target.value)}/>
                    <div>
                        <div onClick={async ()=>{
                            if (data1.trim() === '') {
                                alert('Проверьте правильность введенных данных');
                                return;
                            }
                            try {
                                const response = await axios.delete('http://192.168.56.101:8080/teacher/'+token+'/student/'+data1)
                            }
                            catch (e) {
                                alert(e.response.data)
                            }
                        }}>
                            Удалить студента
                        </div>
                    </div>
                </div>
                <div className="adminpanel__element">
                    <input  placeholder="Введите email студента" className="adminpanel__input" type="text" value={data2} onChange={(e)=>setData2(e.target.value)}/>
                    <div>
                        <div onClick={async ()=>{
                            if (data2.trim() === '') {
                                alert('Проверьте правильность введенных данных');
                                return;
                            }
                            studentTestsRequest(data2)
                        }}>
                            Получить список тестов студента
                        </div>
                    </div>
                </div>
                <div className="adminpanel__element">
                    <input placeholder="Введите email студента" className="adminpanel__input" type="text" value={data3} onChange={(e)=>setData3(e.target.value)}/>
                    <input placeholder="Введите группу" className="adminpanel__input" type="text" value={data4} onChange={(e)=>setData4(e.target.value)}/>
                    <div>
                        <div onClick={async ()=>{
                            if (data3.trim() === ''||data4.trim() === '') {
                                alert('Проверьте правильность введенных данных');
                                return;
                            }
                            let gId;
                            groupsList.map((grouppa,index)=>{
                                if (grouppa.name === data4){
                                    gId = grouppa.id
                                }
                            })
                            try {
                                const response = await axios.post('http://192.168.56.101:8080/teacher/'+token+'/students',
                                    {email:data3,
                                group:Number(gId)})
                            }
                            catch (e) {
                                alert(e.response.data)
                            }
                        }}>
                            Сменить группу студента
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const StudentsList = () =>{
        if (studentsList!==null)
            return(
                <div className="adminpanel__table">
                    {studentsList.map((student,index)=>{
                        return(
                            <div key={index} className="adminpanel__titem">
                                <div>
                                    {student.surname}{student.name}{student.secondname}
                                </div>
                                <div>
                                    {student.email}
                                </div>
                                <div className="popup" onClick={()=>studentTestsRequest(student.email)}>
                                    Запросить все тесты
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
    }
    const TestsList = () =>{

        const TestBody = ({index}) =>{
            if (curTest[index]!==undefined)
            return(
                <div className="adminpanel__result">
                    {curTest[index].test.map((question,index)=>{
                        return(
                            <div key={index}>
                                <span>{question.text}</span>
                                <div>
                                    {question.pictures===undefined ? null : question.pictures.map((picture,index)=>{
                                        return(
                                            <div key={index}>
                                                {picture.img}
                                                {picture.caption}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div>
                                    {question.answers===undefined ? null :question.answers.map((answer,index)=>{
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
                console.log(id,index,curMail)
                const response = await axios.get('http://192.168.56.101:8080/teacher/'+token+'/student/'+curMail+'/'+id)
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
                <div className="adminpanel__table">
                    {testsList.map((test,index)=>{
                        return(
                            <div key={index} className="adminpanel__titem">
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

    const GroupsList = () =>{
        if (groupsList!==null??groupFlag)
        return(
            <div className="adminpanel__result">
            {groupsList.map((group,index)=>{
                return(
                    <div className="adminpanel__titem">
                        {group.name}
                        <div onClick={()=>studentsListRequest(group.name)}>
                            Запросить всех студентов
                        </div>
                    </div>
                )
                })}
            </div>
        )
    }
    useEffect(()=>{
        getGroupsList()
    },[])
    return (
        <div>
            <Header/>
            <div className={openedModal ? modalStyle : null} onClick={()=>{dispatch(closeModal())}} style={{display:"flex",justifyContent:"center"}}>
                <DbSideBar/>
                <Body >
                    <div className="adminpanel__body">
                        <div className="adminpanel__functions">
                        <GroupPanel/>
                        <StudentPanel/>
                        </div>
                        <div className="adminpanel__tables">
                            <StudentsList/>
                            <TestsList/>
                            <GroupsList/>
                        </div>
                    </div>
                </Body>
            </div>
            {openedModal ? <AuthForm/> : null}
        </div>
    );
};

export default AdminPanel;