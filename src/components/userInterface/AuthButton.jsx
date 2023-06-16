import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
const AuthButton = (props) => {
    const isAuth = useSelector(state => state.user.isAuth)
    const data = useSelector(state => state.user.currentUser)
    const [show,setShow] = useState(false)
    function AuthComplete(){
        const style = {display:'block'}
        return(
            <div onClick={()=>{setShow(!show)}} className="auth__block">
                {data.email}
                <div style={show ? style : null}>
                    <Link to='/dashboard'>
                        Панель управления
                    </Link>
                </div>
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