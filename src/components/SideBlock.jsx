import React from 'react';
import SideItem from "./SideItem";

const SideBlock = (props) => {
    return (
        <div className="sidebar__section">
            <h2>{props.title}</h2>
            {props.items.map((item,index) =>
            <SideItem numer = {index + 1} item = {item} key = {item.id} changeSumm = {props.changeSumm}/>)}
            <a href='/src/Дешифратор/Простой/Simple.html' className="sidebar__item">
                Простой Шифраторы и дешифраторы
            </a>
            <div  onClick={()=>window.location.replace('/Дешифратор/Простой/Universe.html')} className="sidebar__item">
                Универсальный Шифраторы и дешифраторы
            </div>
        </div>
    );
};

export default SideBlock;