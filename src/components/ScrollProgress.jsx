import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Rocket } from 'lucide-react';
import styles from './ScrollProgress.module.scss';
import { useTheme } from '../context/ThemeContext';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className={styles.progressBar}
            style={{ scaleX }}
        />
    );
};

export default ScrollProgress;
