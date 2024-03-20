import Navbar from '../../widgets/Navbar/Navbar';
import s from './MainPage.module.scss';

const MainPage = () => {
    return (
        <div className={s.main}>
            <Navbar />
            <div className={s.first}>
                <h1>Nova-Terra</h1>
            </div>
            <div className={s.second}>
                <p>
                    The year is 2150. Andromeda Galaxy, Nova Terra planet
                    In the era of space travel and interstellar colonies, humanity has reached new horizons in space exploration. The planet Nova Terra, rich in unique minerals, has become a key facility for the construction of nuclear power plants that provide energy not only to colonies on its surface, but also to long-range space expeditions.
                </p>
                <ul>Nova Terra is divided into 5 colonies:
                    <li>Aquarion</li>
                    <li>Green Maze</li>
                    <li>Terramorph</li>
                    <li>Crystals</li>
                    <li>Desert Whirlwind</li>
                </ul>
                <p>Each colony has one nuclear power plant and every year the number of systems that ensure their operation increases. However, technological progress has not been accompanied by a similar increase in the number of specialists. The demographic transition and migration of the population to new planets have led to a shortage of qualified engineers and technical specialists</p>
            </div>
        </div>
    )
}
export default MainPage;