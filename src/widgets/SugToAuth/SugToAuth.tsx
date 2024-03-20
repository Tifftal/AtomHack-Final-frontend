import s from './SugToAuth.module.scss';
import { Button } from '@mantine/core';

const SugToAuth = () => {
    return (
        <div className={s.nav}>
            <p>Уже есть аккаунт?</p>
            <Button variant="subtle">Войти</Button>
        </div>
    )
}

export default SugToAuth;