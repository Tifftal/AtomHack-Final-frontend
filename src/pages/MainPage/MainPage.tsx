import s from './MainPage.module.scss';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <div className={s.main}>
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
    )
}
export default MainPage;