import { Button } from '@mantine/core';
import s from './Navbar.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [language, setLanguage] = useState("ru");

    const changeLanguage = (language: string) => {
        switch (language) {
            case "en":
                i18n.changeLanguage("ru");
                setLanguage("ru");
                break; 
            case "ru":
                i18n.changeLanguage("en");
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