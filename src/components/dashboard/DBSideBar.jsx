import React from 'react';
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

const DbSideBar = () => {
    const isTeacher = useSelector(state => state.user.isTeacher)
    const options = isTeacher? [
        { heading: 'Конструктор вопросов', path: '/questconst' },
        { heading: 'Конструктор тестов', path: '/testconst' },
        { heading: 'Провести тестирование', path: '/testlaunch' },
        { heading: 'Результаты тестирования', path: '/testresult' },
        {heading: 'Панель управления',path: '/admin'}]
        :
        [
            { heading: 'Пройти тестирование', path: '/test' },
            { heading: 'Результаты тестирования', path: '/testresult' }
        ];

    return (
        <div className="sidebar">
            <ul className="db__list">
                {options.map((option, index) => (
                    <li key={index}>
                        <Link to={option.path}>{option.heading}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DbSideBar;
