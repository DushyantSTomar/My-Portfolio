import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { blogsData } from '../data/blogsData';
import styles from './BlogListing.module.scss';
import blogStyles from './Blogs.module.scss'; // Reusing card & swiper styles

const BlogListing = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className={styles.blogListingSection}>
            <div className={styles.container}>
                <motion.nav
                    className={styles.breadcrumbs}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/" className={styles.crumbLink}>Home</Link>
                    <span className={styles.separator}>/</span>
                    <span className={styles.crumbCurrent}>Blogs</span>
                </motion.nav>

                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>All Blogs</h1>
                    <div className={styles.line}></div>
                </motion.div>

                <div className={`${styles.playlistsContainer} ${blogStyles.blogsSection}`}>
                    {[...new Set(blogsData.map(b => b.category))].map((category, index) => {
                        const categoryBlogs = blogsData.filter(b => b.category === category);

                        // Create unique refs for each row
                        const prevRef = useRef(null);
                        const nextRef = useRef(null);
                        const [init, setInit] = useState(false);

                        return (
                            <motion.div
                                key={index}
                                className={styles.playlistRow}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <h2 className={styles.categoryTitle}>{category}</h2>

                                <div className={blogStyles.swiperContainer}>
                                    <Swiper
                                        modules={[Autoplay, Navigation, Pagination, FreeMode]}
                                        spaceBetween={20}
                                        slidesPerView={1.2}
                                        speed={2000}
                                        freeMode={true}
                                        grabCursor={true}
                                        navigation={{
                                            prevEl: prevRef.current,
                                            nextEl: nextRef.current,
                                        }}
                                        onInit={() => setInit(true)}
                                        pagination={{ clickable: true }}
                                        autoplay={{
                                            delay: 2500 + (index * 500), // Stagger autoplay slightly
                                            disableOnInteraction: false,
                                            pauseOnMouseEnter: true
                                        }}
                                        breakpoints={{
                                            640: { slidesPerView: 1.2 },
                                            768: { slidesPerView: 2.5 },
                                            1024: { slidesPerView: 4 },
                                        }}
                                        className={blogStyles.swiper}
                                    >
                                        {categoryBlogs.map((blog) => (
                                            <SwiperSlide key={blog.id} className={blogStyles.slide}>
                                                <motion.div
                                                    className={blogStyles.card}
                                                    whileHover={{ y: -12 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className={blogStyles.imageBox}>
                                                        <img src={blog.img} alt={blog.title} />
                                                    </div>
                                                    <div className={blogStyles.content}>
                                                        <h3>{blog.title}</h3>
                                                        <p>{blog.summary}</p>
                                                        <Link to={`/blog/${blog.id}`} className={blogStyles.btnPrimary}>
                                                            Deep Dive
                                                        </Link>
                                                    </div>
                                                </motion.div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Custom Navigation Arrows for this specific row */}
                                    <div ref={prevRef} className={blogStyles.swiperButtonPrev}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                    </div>
                                    <div ref={nextRef} className={blogStyles.swiperButtonNext}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BlogListing;
