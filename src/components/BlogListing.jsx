import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { blogsData } from '../data/blogsData';
import styles from './BlogListing.module.scss';
import blogStyles from './Blogs.module.scss'; // Reusing card & swiper styles
import useWindowWidth from '../hooks/useWindowWidth';

const CategoryRow = ({ category, blogs, index, windowWidth }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [_, setInit] = useState(false);

    // Calculate if we should enable infinite looping based on user requirement:
    // 1. Desktop (>= 1024) - Unchanged (Always loop)
    // 2. Mobile/Tablet (< 1024) - Loop only if >= 8 items
    const isMobileTablet = windowWidth < 1024;
    const shouldLoop = !isMobileTablet || blogs.length >= 8;

    // Evaluate if this category row should be a static grid instead of a carousel
    // 1. If it fits purely on desktop without scrolling
    // 2. NEW: If it has exactly 4 items (as requested for Blogs page UX improvement)
    const requiredWidth = blogs.length * 350;
    const isStaticGrid = (windowWidth >= 1024 && requiredWidth <= windowWidth - 100) || blogs.length === 4;

    return (
        <motion.div
            className={styles.playlistRow}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <h2 className={styles.categoryTitle}>{category}</h2>

            <div className={blogStyles.swiperContainer}>
                {isStaticGrid ? (
                    <div className={blogStyles.staticGrid}>
                        {blogs.map((blog) => (
                            <div key={blog.id} className={blogStyles.slide}>
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
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <Swiper
                            modules={[Autoplay, Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={'auto'}
                            centeredSlides={shouldLoop} // If looping is disabled, turn off centering to stop flush against edges
                            loop={shouldLoop}
                            loopAdditionalSlides={shouldLoop ? 5 : 0}
                            speed={800}
                            grabCursor={true}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            onInit={() => setInit(true)}
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 3500 + index * 500,
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
                            className={blogStyles.swiper}
                        >
                            {blogs.map((blog) => (
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
                    </>
                )}
            </div>
        </motion.div>
    );
};

const BlogListing = () => {
    const windowWidth = useWindowWidth();

    useEffect(() => {
        // Restore scroll position if it exists in session storage
        const savedScrollPos = sessionStorage.getItem('blogs_scroll_pos');
        if (savedScrollPos) {
            window.scrollTo(0, parseInt(savedScrollPos, 10));
            // Clear the position so fresh visits don't accidentally scroll
            sessionStorage.removeItem('blogs_scroll_pos');
        } else {
            window.scrollTo(0, 0);
        }

        // Cleanup function: Save current scroll position before unmounting
        return () => {
            sessionStorage.setItem('blogs_scroll_pos', window.scrollY.toString());
        };
    }, []);

    const categories = [...new Set(blogsData.map(b => b.category))];

    return (
        <section className={styles.blogListingSection}>
            <div className={styles.container}>
                {/* <motion.nav
                    className={styles.breadcrumbs}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/" className={styles.crumbLink}>Home</Link>
                    <span className={styles.separator}>/</span>
                    <span className={styles.crumbCurrent}>Blogs</span>
                </motion.nav> */}

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
                    {categories.map((category, index) => {
                        const categoryBlogs = blogsData.filter(b => b.category === category);
                        return (
                            <CategoryRow
                                key={category}
                                category={category}
                                blogs={categoryBlogs}
                                index={index}
                                windowWidth={windowWidth}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BlogListing;
