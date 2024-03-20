import { Link } from 'react-router-dom';
import s from './SugToAuth.module.scss';
import { Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const SugToAuth = () => {
    const {t} = useTranslation();
    
    return (
        <div className={s.nav}>
            <p>{t("registration.have-acc")}</p>
            <Button component={Link} to="/" variant="subtle">{t("registration.login")}</Button>
        </div>
    )
}

export default SugToAuth;