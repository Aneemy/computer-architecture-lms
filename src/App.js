    import React, {useEffect, useState} from "react";
    import './components/styles/main.css';
    import Main from "./components/Main";
    import {BrowserRouter, Route,Routes} from "react-router-dom";
    import {useDispatch, useSelector} from "react-redux";
    import {auth} from "./http/user";

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
                        <Route path="/" element={<Main isAuth = {isAuth}/>} />
                    </Routes>
                </div>
          </BrowserRouter>
      );
    }

    export default App;