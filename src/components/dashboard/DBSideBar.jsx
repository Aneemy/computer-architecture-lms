import React from 'react';
import { Link } from "react-router-dom";

const DbSideBar = () => {
    const options = [
        { heading: 'Конструктор вопросов', path: '/questconst' },
        { heading: 'Конструктор тестов', path: '/testconst' },
        { heading: 'Провести тестирование', path: '/testlaunch' },
        { heading: 'Пройти тестирование', path: '/test' },
        { heading: 'Результаты тестирования', path: '/questconst' },
        {heading: 'Панель управления',path: '/admin'}
    ];

    return (
        <div className="sidebar">
            <ul>
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
