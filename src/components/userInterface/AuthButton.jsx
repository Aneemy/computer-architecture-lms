import React, {useContext, useState} from 'react';
import {useSelector} from "react-redux";
const AuthButton = (props) => {
    const isAuth = useSelector(state => state.user.isAuth)
    function AuthComplete(data){
        return(
            <div className="auth__block">
            </div>
        )
    }
    function AuthIncomplete(data){
        return(
            <div className="auth__block" onClick={()=>{
                props.setOpenModal(!props.openModal)
            }
            }>
                Войти
            </div>
        )
    }

    return (
        <div>
            { isAuth ? AuthComplete() : AuthIncomplete()}
        </div>
    );
};

export default AuthButton;