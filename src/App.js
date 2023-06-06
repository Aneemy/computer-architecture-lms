    import React, {useEffect, useState} from "react";
    import './components/styles/main.css';
    import Main from "./components/Main";
    import {BrowserRouter, Route,Routes} from "react-router-dom";
    import {useDispatch, useSelector} from "react-redux";
    import {auth} from "./http/user";
    import dashboard from "./components/dashboard/Dashboard";
    import Dashboard from "./components/dashboard/Dashboard";
    import QuestConst from "./components/dashboard/QuestConst";


    function App() {
        const isAuth = useSelector(state => state.user.isAuth)
        const dispatch = useDispatch();

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
                    </Routes>
                </div>
          </BrowserRouter>
      );
    }

    export default App;