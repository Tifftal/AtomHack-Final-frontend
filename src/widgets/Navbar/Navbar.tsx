import { Button } from '@mantine/core';
import s from './Navbar.module.scss';

const Navbar = () => {
    return(
        <div className={s.navbar}>
            <h2>Talankina Varvara</h2>
            <Button variant='outline' classNames={{label: s.label}}>Выйти</Button>
        </div>
    )
}

export default Navbar;