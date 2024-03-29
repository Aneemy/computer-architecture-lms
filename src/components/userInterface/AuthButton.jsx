import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {openModal} from "../../reducers/uiReducer";
import {delUser} from "../../reducers/userReducer";
const AuthButton = (props) => {
    const isAuth = useSelector(state => state.user.isAuth)
    const data = useSelector(state => state.user.currentUser)
    const [show,setShow] = useState(false)
    const dispatch = useDispatch();

    function AuthComplete(){
        const style = {display:'block'}
        return(
            <div onClick={()=>{setShow(!show)}} className="auth__block">
                {data.email}
                <div className={show ?"auth__list" : "auth__list hidden"}>
                    <div>
                        <Link to={props.loc ? '/dashboard' : '/'}>
                            {props.loc ? 'Панель управления' : 'Главная'}
                        </Link>
                    </div>
                    <div onClick={()=>{dispatch(delUser())}
                    }>
                        Выход
                    </div>
                </div>
            </div>
        )
    }
    function AuthIncomplete(data){
        return(
            <div className="auth__block" onClick={()=>{
                dispatch(openModal())
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