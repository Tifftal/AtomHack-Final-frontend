import { Button } from '@mantine/core';
import s from './Navbar.module.scss';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../enteties/user/api';

const Navbar = () => {
    const navigate = useNavigate();

    const handleOut = () => {
        logout()
        .then(() => {
            navigate("/")
        })
    } 

    return(
        <div className={s.navbar}>
            <h2>Talankina Varvara</h2>
            <Button variant='outline' classNames={{label: s.label}} onClick={handleOut}>Выйти</Button>
        </div>
    )
}

export default Navbar;