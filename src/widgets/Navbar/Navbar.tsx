import { Button } from '@mantine/core';
import s from './Navbar.module.scss';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return(
        <div className={s.navbar}>
            <h2>Talankina Varvara</h2>
            <Button variant='outline' classNames={{label: s.label}} onClick={()=>navigate('/')}>Выйти</Button>
        </div>
    )
}

export default Navbar;