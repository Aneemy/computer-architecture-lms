import React from 'react';
import AuthButton from "./userInterface/AuthButton";
const Header = (props) => {
    return (
        <div className='header'>
            <AuthButton loc = {props.loc}/>
        </div>
    );
};

export default Header;