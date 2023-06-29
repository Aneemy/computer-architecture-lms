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
import {$url, question} from "../../http/user";
import PicturesRow from "./PicturesRow";

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
    const [curTest,setCurTest] = useState(null)
    const [curMail,setCurMail] = useState('')
    const [curIndex,setCurIndex] = useState(null)
    const studentTestsRequest = async (email) =>{
        try {
            const response = await axios.get($url+'/teacher/'+token+'/student/'+email+'/tests')
            console.log('123',response)
            setTestLists(response.data)
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
            const response = await axios.get($url+'/teacher/'+token+'/group/'+temp)
            console.log(response.data)
            setStudentsList(response.data)
        }
        catch (e) {
            alert(e.response)
        }
    }
    const getGroupsList = async () =>{
        try {
            const response = await axios.get($url+'/teacher/'+token+'/groups')
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
                            const response = await axios.post($url+'/teacher/'+token+'/groups',
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
                                const response = await axios.delete($url+'/teacher/'+token+'/group/'+gId)
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
                {/*<div className="adminpanel__element">*/}
                {/*    <div>*/}
                {/*        <div onClick={()=>setGroupFlag(!groupFlag)}>*/}
                {/*            {!groupFlag ? 'Получить список групп' : 'Закрыть список групп'}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
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
                                const response = await axios.delete($url+'/teacher/'+token+'/student/'+data1)
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
                                const response = await axios.post($url+'/teacher/'+token+'/students',
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
    const groupStringToId = () =>{

    }
    const StudentsList = () =>{
        if (studentsList!==null)
            return(
                <div className="adminpanel__table">
                    {studentsList.map((student,index)=>{
                        return(
                            <div key={index} className="adminpanel__titem">
                                <div>
                                    {student.surname} {student.name} {student.secondname}
                                </div>
                                <div>
                                    {student.email}
                                </div>
                                <div className="adminpanel__request" onClick={()=>studentTestsRequest(student.email)}>
                                    Запросить все тесты
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
    }
    const TestsList = () =>{

        const studentTestRequest = async (id) =>{
            try {
                const response = await axios.get($url+'/teacher/'+token+'/student/'+curMail+'/'+id)
                setCurTest(response.data)
                console.log(response.data)
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
                                    <div className="adminpanel__request" onClick={()=>studentTestRequest(test.id)}>
                                        Запросить тест
                                    </div>
                                </div>
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
                        <div className="adminpanel__request" onClick={()=>studentsListRequest(group.name)}>
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
    const TestModal = () =>{
        const OptionsList = ({answers}) =>{
            if (Array.isArray(answers))
            return(
                <div>
                    {answers.map((answer,index)=>{
                    return(
                        <div>
                            <span style={{textDecoration:`${answer.isTrue ? 'underline':null}`,color:`${answer.isSelected ? 'greenyellow':'red'}`}}>{answer.heading}</span>
                        </div>
                    )
                    })
                    }
                </div>
            )
            else {
                return (
                    <div>
                        <span style={answers.isTrue?{color:'green'}:{color:'red'}} >{answers.text}</span>
                    </div>
                )
            }
        }
            return (
                <div className="adminpanel__test">
                    <span onClick={() => setCurTest(null)} className="adminpanel__xclose">Закрыть</span>
                    <div className="adminpanel__list">
                        {curTest.test.map((question, index) => {
                            return (
                                <div className="test__question" key={index}>
                                    <span>{question.quest.text}</span>
                                    <PicturesRow array = {question.quest.pictures} gindex = {index}/>
                                    {question.answers!==undefined&&question.answers!==null ? <OptionsList answers = {question.answers}/>:()=>{
                                        return(
                                            <div>
                                                {question.answers}
                                            </div>
                                        )
                                    }}
                                </div>)
                        })}
                    </div>
                    {curTest.score}
                </div>
            )
    }
    return (
        <div>
            <Header/>
            <div className={openedModal ? modalStyle : null} onClick={()=>{dispatch(closeModal())}} style={{display:"flex",justifyContent:"center"}}>
                <DbSideBar/>
                <Body >

                    {curTest!==null?<TestModal/>:
                        <div className='adminpanel__body'>
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
                    }
                </Body>
            </div>
            {openedModal ? <AuthForm/> : null}
        </div>
    );
};

export default AdminPanel;