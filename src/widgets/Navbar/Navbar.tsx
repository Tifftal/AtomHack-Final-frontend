import { Button } from '@mantine/core';
import s from './Navbar.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { TranslateMessage } from '../../shared/TranslateMessage/TranslateMessage';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [language, setLanguage] = useState(localStorage.getItem("appLanguage") || "en");

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [i18n, language]);

    const changeLanguage = (language: string) => {
        TranslateMessage('ru', "Как тебя зовут?");
        switch (language) {
            case "en":
                i18n.changeLanguage("ru");
                localStorage.setItem("appLanguage", "ru");
                setLanguage("ru");
                break;
            case "ru":
                i18n.changeLanguage("en");
                localStorage.setItem("appLanguage", "en");
                setLanguage("en");
                break;
            default:
                break;
        }
    }

    return (
        <div className={s.navbar}>
            <div className={s.langbtn}>
                <button onClick={() => changeLanguage(language)}>{language}</button>
            </div>
            <div className={s.profilebtn}>
                <h2>Talankina Varvara</h2>
                <Button variant='outline' classNames={{ label: s.label }} onClick={() => navigate('/')}>{t("navbar.log-out-btn")}</Button>
            </div>
        </div>
    )
}

export default Navbar;