    import React, {useEffect, useState} from "react";
    import './components/styles/main.css';
    import Main from "./components/Main";
    import {BrowserRouter, Route,Routes} from "react-router-dom";
    import {useDispatch, useSelector} from "react-redux";
    import Dashboard from "./components/dashboard/Dashboard";
    import QuestConst from "./components/dashboard/QuestConst";
    import TestConst from "./components/dashboard/TestConst";
    import TestLaunch from "./components/dashboard/TestLaunch";
    import Test from "./components/dashboard/Test";
    import adminPanel from "./components/dashboard/AdminPanel";
    import AdminPanel from "./components/dashboard/AdminPanel";
    import {auth} from "./http/user";
    import StudentResult from "./components/dashboard/StudentResult";
    import TeacherResult from "./components/dashboard/TeacherResult";


    function App() {
        const isAuth = useSelector(state => state.user.isAuth)
        const dispatch = useDispatch();
        const isTeacher = useSelector(state => state.user.isTeacher)

        useEffect(()=>{
            dispatch(auth())
        },[])
      return (
          <BrowserRouter>
                <div className="App" >
                    <Routes>
                        <Route exact path="/" element={<Main isAuth = {isAuth}/>} />
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/questconst" element={<QuestConst/>}/>
                        <Route path="/testconst" element={<TestConst/>}/>
                        <Route path = "/testlaunch" element = {<TestLaunch/>}/>
                        <Route path="/teacherresult" element={<TeacherResult/>}/>
                        <Route path="/test" element={<Test/>}/>
                        <Route path="/admin" element={<AdminPanel/>}/>
                        <Route path="/studentresult" element={<StudentResult/>}/>
                    </Routes>
                </div>
          </BrowserRouter>
      );
    }

    export default App;