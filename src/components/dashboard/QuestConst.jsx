import React, { useState } from 'react';
import Header from "../Header";
import Body from "../Body";
import DbSideBar from "./DBSideBar";
import ImageUpload from "./ImageUpload";
import {question} from "../../http/user";
import {useDispatch, useSelector} from "react-redux";
import AuthForm from "../userInterface/AuthForm";
import {modalStyle} from "../Main";
import {closeModal} from "../../reducers/uiReducer";

const QuestConst = () => {
    const [isMA, setIsMA] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [options, setOptions] = useState([]);
    const [pack, setPack] = useState({ name: '', text: '', options: [], pictures: [] });
    const [questionText, setQuestionText] = useState('');
    const [pictures,setPictures] = useState([])
    const openedModal = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const QuestInput = () => {
        const [posOption, setPosOption] = useState({ heading: '', isTrue: false });

        const checkSubmit = () => {
            return posOption.heading !== '';
        };

        return (
            <div className="questconst__form">
                <input
                    className="questconst__input"
                    type="text"
                    value={posOption.heading}
                    onChange={(e) => setPosOption({ ...posOption, heading: e.target.value })}
                />
                <span>
                    Правильный?
                    <input
                        className="questconst__checkbox"
                        type="checkbox"
                        value="Правильный?"
                        checked={posOption.isTrue == null ? false : posOption.isTrue}
                        onChange={(e) => setPosOption({ ...posOption, isTrue: e.target.checked })}
                    />
                </span>
                <button
                    className="questconst__button"
                    onClick={() =>
                        checkSubmit()
                            ? setOptions([...options, posOption])
                            : alert("Проверьте правильность введенных данных")
                    }
                >
                    Добавить
                </button>
            </div>
        );
    };

    const handleOptionDelete = (index) => {
        const updatedOptions = [...options];
        updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
    };

    const OptionsDisplay = () => (
        <ul className="questconst__list">
            <li>Варианты ответа</li>
            {options.map((option, index) => (
                <li style={option.isTrue ?{color:"green"}:null} className="questconst__option" onClick={() => handleOptionDelete(index)} key={index}>
                    {option.heading}
                </li>
            ))}
        </ul>
    );

    const NameInput = () => {
        const [name, setName] = useState('');

        const handleSubmit = (event) => {
            event.preventDefault();

            if (name.trim() === '') {
                alert('Введите имя пакета');
                return;
            }

            const packageData = {
                name: name,
                text: questionText,
                options: options,
                pictures: pictures
            };

            setPack(packageData);
            setIsReady(false);

            question(packageData)
            console.log(packageData)
        };

        return (
            <div className="questconst__modal">
                <span className="questconst__xclose" onClick={() => setIsReady(false)}>
                    Закрыть
                </span>
                <form className="questconst__form" onSubmit={handleSubmit}>
                    <input
                        className="questconst__input"
                        placeholder="Введите название вопроса"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                    />
                    <button style={{marginBottom:'20px'}} className="questconst__button" type="submit">
                        Загрузить вопрос на сервер
                    </button>
                </form>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div className={openedModal ? modalStyle : null} onClick={()=>{dispatch(closeModal())}} style={{display:"flex",justifyContent:"center"}}>
                <DbSideBar />
                <Body>
                    <div className={isReady ? "modal__opened questconst__body" : "questconst__body"}>
                            <input className="questconst__input" placeholder="Формулировка вопроса" type="text" value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}/>
                    <div className="questconst__buttons">
                        <div>
                            <button onClick={() => setIsMA(false)}>Со свободным ответом</button>
                        </div>
                        <div>
                            <button onClick={() => setIsMA(true)}>С выбором ответа</button>
                        </div>
                    </div>
                    <ImageUpload setPictures={setPictures} />
                    <div className="questconst__box">
                        {isMA && <QuestInput />}
                        {isMA && <OptionsDisplay />}
                    </div>
                    <button className="questconst__button" onClick={() => setIsReady(true)}>
                        Завершить формирование вопроса
                    </button>
                    </div>
                    {isReady && <NameInput />}
                </Body>
            </div>
            {openedModal ? <AuthForm/> : null}
        </div>
    );
};

export default QuestConst;
