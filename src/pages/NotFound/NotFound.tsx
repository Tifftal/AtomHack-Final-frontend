import { Button } from '@mantine/core';
import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className={styles.notfound}>
            <h1>Страница не найдена</h1>
            <Link to="/">
                <Button>Вернуться на главную</Button>
            </Link>
        </div>
    )
}

export default NotFound