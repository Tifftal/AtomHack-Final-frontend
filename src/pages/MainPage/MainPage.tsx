import { useEffect, useRef } from 'react';
import s from './MainPage.module.scss';
import Navbar from '../../widgets/Navbar/Navbar';

const MainPage = () => {
    const bgRef = useRef<HTMLDivElement>(null);
    const parallaxRedRef = useRef<HTMLDivElement>(null);
    const parallaxOrangeRef = useRef<HTMLDivElement>(null);

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
                        <div className={s.content}>
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
                    </div>
                </div>
                N</div >
        </div>
    );
};

export default MainPage;
