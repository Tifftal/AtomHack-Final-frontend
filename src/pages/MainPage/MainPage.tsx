import { useState, useEffect, useRef } from 'react';
import s from './MainPage.module.scss';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Button } from '@mantine/core';
import { IconPointerPlus, IconPointerMinus } from "@tabler/icons-react";

const MainPage = () => {
    const [backgroundActive, setBackgroundActive] = useState(() => {
        const storedValue = localStorage.getItem('backgroundActive');
        return storedValue ? JSON.parse(storedValue) : true;
    });
    const bgRef = useRef<HTMLDivElement>(null);
    const parallaxRedRef = useRef<HTMLDivElement>(null);
    const parallaxOrangeRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            if (backgroundActive) {
                if (bgRef.current) {
                    bgRef.current.style.transform = `translate(-${x * 10}px, -${y * 10}px)`;
                }
                if (parallaxRedRef.current) {
                    parallaxRedRef.current.style.transform = `translate(-${x * 10}px, -${y * 10}px)`;
                }
                if (parallaxOrangeRef.current) {
                    parallaxOrangeRef.current.style.transform = `translate(-${x * 10}px, -${y * 10}px)`;
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [backgroundActive]);

    const toggleBackground = () => {
        const newValue = !backgroundActive;
        setBackgroundActive(newValue);
        localStorage.setItem('backgroundActive', JSON.stringify(newValue));
    };

    return (
        <div>
            <div className={s.parallax} >
                <div ref={bgRef} className={`${s.parallaxBg} parallaxBg`}></div>
                <div ref={parallaxRedRef} className={`${s.parallaxRed} parallaxRed`}></div>
                <div ref={parallaxOrangeRef} className={`${s.parallaxOrange} parallaxOrange`}></div>

                <div className={s.mainContent}>
                    <div className={s.blurredBackground}>
                        <div className={s.first}>
                            <h1>{t("main.title")}</h1>
                            <Button size="xs" onClick={toggleBackground}>{backgroundActive ? <IconPointerMinus /> : <IconPointerPlus />}</Button>
                        </div>
                        <div className={s.second}>
                            <p>{t("main.text1")}</p>
                            <ul>{t("main.list")}
                                <li>{t("main.l1")}</li>
                                <li>{t("main.l2")}</li>
                                <li>{t("main.l3")}</li>
                                <li>{t("main.l4")}</li>
                                <li>{t("main.l5")}</li>
                            </ul>
                            <p>{t("main.text2")}</p>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default MainPage;
