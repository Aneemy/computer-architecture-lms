import React from 'react';
import AuthButton from "./userInterface/AuthButton";
const Header = (props) => {
    return (
        <div className='header'>
            <AuthButton openModal = {props.openModal} setOpenModal = {props.setOpenModal}/>
        </div>
    );
};

export default Header;