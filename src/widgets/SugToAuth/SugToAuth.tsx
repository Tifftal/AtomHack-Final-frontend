import { Link } from 'react-router-dom';
import s from './SugToAuth.module.scss';
import { Button } from '@mantine/core';

const SugToAuth = () => {
    return (
        <div className={s.nav}>
            <p>Уже есть аккаунт?</p>
            <Button component={Link} to="/" variant="subtle">Войти</Button>
        </div>
    )
}

export default SugToAuth;