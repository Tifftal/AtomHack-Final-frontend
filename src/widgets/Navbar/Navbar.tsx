import { Button } from '@mantine/core';
import s from './Navbar.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { TranslateMessage } from '../../shared/TranslateMessage/TranslateMessage';
import { logout } from '../../enteties/user/api';
import { getUser } from '../../enteties/user/api';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [user, setUser] = useState<string>("");
    const isAuth = localStorage.getItem("isAuth");

    const [language, setLanguage] = useState(localStorage.getItem("appLanguage") || "en");
    useEffect(() => {
        i18n.changeLanguage(language);
    }, [i18n, language]);

    useEffect(() => {
        if (isAuth) {
            getUser()
            .then((response) => {
                console.log(response);
                setUser(`${response.name} ${response.surname} ${response.middlename}`);
            })
        }
    }, [isAuth, navigate])
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
    const handleOut = () => {
        logout()
        .then(() => {
            navigate("/auth")
        })
    }

    return (
        <div className={s.navbar}>
            <div className={s.langbtn}>
                <button onClick={() => changeLanguage(language)}>{language}</button>
            </div>
            <div className={s.profilebtn}>
                <h2>
                    {
                        isAuth ?
                        ""
                        :
                        user   
                    }
                </h2>
                <Button variant='outline' classNames={{ label: s.label }} onClick={handleOut}>
                    {isAuth ? 
                    t("navbar.log-out-btn")
                    : 
                    t("auth.log-in")
                    }
                    </Button>
            </div>
        </div>
        )
}

export default Navbar;