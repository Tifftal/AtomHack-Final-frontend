import { useEffect, useRef } from 'react';
import s from './MainPage.module.scss';
import Navbar from '../../widgets/Navbar/Navbar';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
    const bgRef = useRef<HTMLDivElement>(null);
    const parallaxRedRef = useRef<HTMLDivElement>(null);
    const parallaxOrangeRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            if (bgRef.current) {
                bgRef.current.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
            }
            if (parallaxRedRef.current) {
                parallaxRedRef.current.style.transform = `translate(-${x * 50}px, -${y * 50}px)`;
            }
            if (parallaxOrangeRef.current) {
                parallaxOrangeRef.current.style.transform = `translate(-${x * 100}px, -${y * 50}px)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div>
            <Navbar />
            < div className={s.parallax} >
                <div ref={bgRef} className={`${s.parallaxBg} parallaxBg`}></div>
                <div ref={parallaxRedRef} className={`${s.parallaxRed} parallaxRed`}></div>
                <div ref={parallaxOrangeRef} className={`${s.parallaxOrange} parallaxOrange`}></div>

                <div className={s.mainContent}>
                    <div className={s.blurredBackground}>
                        <div className={s.first}>
                            <h1>{t("main.title")}</h1>
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
