import React, {useState} from 'react';
import AInput from "./AInput";
import {login, registration} from "../../http/user";
import {useDispatch} from "react-redux";
const AuthForm = (props) => {
    const [isExisting,setIsExisting] = useState(true)
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [secondname,setSecondName] = useState('');
    const [group,setGroup] = useState('');
    const dispatch = useDispatch()
    const [isTeacher,setIsTeacher] = useState(false)
    console.log(isTeacher)
    return (
        isExisting ?
            <div className= "auth__form">
                <div className="auth__inputs">
                    <AInput type = {"text"} placeholder ={"Логин"} changeData = {setEmail}  data= {email}/>
                    <AInput type = {"password"} placeholder ={"Пароль"} changeData = {setPassword}  data= {password}/>
                    <div>
                        Предподаватель?
                    <input type="checkbox" checked={isTeacher} onChange={(e)=>{setIsTeacher(e.currentTarget.checked)}}/>
                    </div>
                </div>
                <button className="auth__subbtn" onClick={()=>dispatch(login(email,password,isTeacher))}>Отправить</button>
                <span>Нет учетной записи? <span onClick={()=>setIsExisting(false)}>Зарегестрируйтесь!</span></span>
            </div> :
            <div className= "auth__form">
                <div className="auth__inputs">
                    <AInput type = {"text"} placeholder ={"Фамилия"}  changeData = {setSurname}  data= {surname}/>
                    <AInput type = {"text"} placeholder ={"Имя"}  changeData = {setName} data = {name}/>
                    <AInput type = {"text"} placeholder ={"Отчество"}  changeData = {setSecondName}  data= {secondname}/>
                    <AInput type = {"text"} placeholder ={"Группа"}  changeData = {setGroup}  data= {group}/>
                    <AInput type = {"text"} placeholder ={"Email"}  changeData = {setEmail}  data= {email}/>
                    <AInput type = {"password"} placeholder ={"Пароль"}  changeData = {setPassword}  data= {password}/>
                </div>
                <button className="auth__subbtn" onClick={()=>(registration(surname,name,secondname,group,email,password))}>Отправить</button>
        </div>
    );
};

export default AuthForm;