import React from 'react';
import { Link } from "react-router-dom";

const DbSideBar = () => {
    const options = [
        { heading: 'Конструктор вопросов', path: '/questconst' },
        { heading: 'Конструктор тестов', path: '/questconst' },
        { heading: 'Провести тестирование', path: '/questconst' },
        { heading: 'Пройти тестирование', path: '/questconst' },
        { heading: 'Результаты тестирования', path: '/questconst' },
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
