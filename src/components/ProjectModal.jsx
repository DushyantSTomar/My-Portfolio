import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import styles from './ProjectModal.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const ProjectModal = ({ isOpen, onClose, project }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !project) return null;
    const images = project.gallery || [project.img, project.img, project.img];

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.modalContent}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeButton} onClick={onClose}>
                            <X size={20} />
                        </button>

                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 20,
                                stretch: 0,
                                depth: 200,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            pagination={true}
                            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                            className={styles.swiper}
                            initialSlide={0}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                        >
                            {images.map((img, index) => (
                                <SwiperSlide key={index} className={styles.swiperSlide}>
                                    <img src={img} alt={`${project.title} slide ${index + 1}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ProjectModal;
