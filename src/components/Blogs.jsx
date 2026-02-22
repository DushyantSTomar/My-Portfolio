import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, FreeMode } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import styles from './Blogs.module.scss';
import { motion } from 'framer-motion';
import { blogsData } from '../data/blogsData';

const Blogs = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [_, setInit] = useState(false);

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
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination, FreeMode]}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        loop={true}
                        speed={2000} // Slow down animation (2s to transition)
                        freeMode={true} // Enable momentum scroll
                        grabCursor={true} // Hand cursor for dragging
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onInit={() => setInit(true)}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 2500, // Reduced delay to compensate for longer transition speed
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        breakpoints={{
                            640: { slidesPerView: 1.2 },
                            768: { slidesPerView: 2.5 },
                            1024: { slidesPerView: 4 },
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
                </div>
            </div>
        </section>
    );
};

export default Blogs;
