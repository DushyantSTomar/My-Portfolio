import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import styles from './Blogs.module.scss';
import { motion } from 'framer-motion';
import { blogsData } from '../data/blogsData';
import useWindowWidth from '../hooks/useWindowWidth';

const Blogs = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [_, setInit] = useState(false);
    const windowWidth = useWindowWidth();
    const isMobileTablet = windowWidth < 1024;
    const shouldLoop = !isMobileTablet || blogsData.length >= 8;

    const requiredWidth = blogsData.length * 350;
    const isDesktopGrid = windowWidth >= 1024 && requiredWidth <= windowWidth - 100;

    return (
        <section id="blogs" className={styles.blogsSection}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>Blogs</h2>
                    <div className={styles.line}></div>
                </motion.div>

                <div className={styles.swiperContainer}>
                    {isDesktopGrid ? (
                        <div className={styles.staticGrid}>
                            {blogsData.map((blog) => (
                                <div key={blog.id} className={styles.slide}>
                                    <motion.div
                                        className={styles.card}
                                        whileHover={{ y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className={styles.imageBox}>
                                            <img src={blog.img} alt={blog.title} />
                                        </div>
                                        <div className={styles.content}>
                                            <h3>{blog.title}</h3>
                                            <p>{blog.summary}</p>
                                            <Link to={`/blog/${blog.id}`} className={styles.btnPrimary}>
                                                Deep Dive
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <Swiper
                                modules={[Autoplay, Navigation, Pagination]}
                                spaceBetween={30}
                                slidesPerView={'auto'}
                                centeredSlides={shouldLoop}
                                loop={shouldLoop}
                                loopAdditionalSlides={shouldLoop ? 5 : 0}
                                speed={800} // Smooth, fast-enough slide transition
                                grabCursor={true} // Hand cursor for dragging
                                navigation={{
                                    prevEl: prevRef.current,
                                    nextEl: nextRef.current,
                                }}
                                onInit={() => setInit(true)}
                                pagination={{ clickable: true }}
                                autoplay={{
                                    delay: 3500, // Pause between slides
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                    stopOnLastSlide: !shouldLoop
                                }}
                                autoHeight={true}
                                onTouchStart={(swiper) => {
                                    swiper.autoplay.stop();
                                }}
                                onTouchEnd={(swiper) => {
                                    swiper.autoplay.start();
                                }}
                                className={styles.swiper}
                            >
                                {blogsData.map((blog) => (
                                    <SwiperSlide key={blog.id} className={styles.slide}>
                                        <motion.div
                                            className={styles.card}
                                            whileHover={{ y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className={styles.imageBox}>
                                                <img src={blog.img} alt={blog.title} />
                                            </div>
                                            <div className={styles.content}>
                                                <h3>{blog.title}</h3>
                                                <p>{blog.summary}</p>
                                                <Link to={`/blog/${blog.id}`} className={styles.btnPrimary}>
                                                    Deep Dive
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Custom Navigation Arrows */}
                            <div ref={prevRef} className={styles.swiperButtonPrev}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </div>
                            <div ref={nextRef} className={styles.swiperButtonNext}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Blogs;
