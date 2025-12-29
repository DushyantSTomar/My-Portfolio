import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import styles from './TechCarousel.module.scss';
import { motion } from 'framer-motion';

const techs = [
    { name: 'React', img: '/assets/React.png' },
    { name: 'Redux', img: '/assets/Redux-Toolkit.png' },
    { name: 'JS', img: '/assets/Java-Script.webp' },
    { name: 'TS', img: '/assets/Type-Script.png' },
    { name: 'HTML5', img: '/assets/HTML-5.png' },
    { name: 'CSS3', img: '/assets/CSS-3.png' },
    { name: 'Node', img: '/assets/Node-js.webp' },
    { name: 'Express', img: '/assets/Express-JS.webp' },
    { name: 'Mongo', img: '/assets/Mongo-DB.png' },
    { name: 'Firebase', img: '/assets/Firebase.png' },
    { name: 'Docker', img: '/assets/Docker.webp' },
    { name: 'Android', img: '/assets/Android-Studio.png' },
    { name: 'VSCode', img: '/assets/VS-Code.png' },
    { name: 'XCode', img: '/assets/X-Code.png' },
];

const TechCarousel = () => {
    return (
        <section className={styles.techSection}>
            <motion.div
                className={styles.header}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2>Technology Used</h2>
                <div className={styles.line}></div>
            </motion.div>

            <Swiper
                modules={[Autoplay]}
                spaceBetween={50}
                slidesPerView={3}
                loop={true}
                speed={1000}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 5 },
                    1024: { slidesPerView: 7 },
                }}
                className={styles.swiper}
            >
                {techs.map((tech, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <img src={tech.img} alt={tech.name} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default TechCarousel;
