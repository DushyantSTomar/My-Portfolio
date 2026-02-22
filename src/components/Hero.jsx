import React from 'react';
import styles from './Hero.module.scss';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const Hero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [0, window.innerHeight], [10, -10]);
  const rotateY = useTransform(x, [0, window.innerWidth], [-10, 10]);

  function handleMouse(event) {
    x.set(event.clientX);
    y.set(event.clientY);
  }

  return (
    <section id="home" className={styles.hero} onMouseMove={handleMouse}>
      {/* Interactive Background Elements */}
      <motion.div
        className={`${styles.bgShape} ${styles.shape1}`}
        style={{ x: useTransform(x, [0, window.innerWidth], [-20, 20]), y: useTransform(y, [0, window.innerHeight], [-20, 20]) }}
      />
      <motion.div
        className={`${styles.bgShape} ${styles.shape2}`}
        style={{ x: useTransform(x, [0, window.innerWidth], [30, -30]), y: useTransform(y, [0, window.innerHeight], [30, -30]) }}
      />
      <motion.div
        className={`${styles.bgShape} ${styles.shape3}`}
        style={{ x: useTransform(x, [0, window.innerWidth], [-40, 40]), y: useTransform(y, [0, window.innerHeight], [20, -20]) }}
      />

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h4>
            Hello, I'm
          </h4>
          <h1>
            Dushyant Tomar
          </h1>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {Array.from("Senior React Developer").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05, delay: 1 + index * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h3>

          <p>
            Building scalable mobile & web apps used across telecom, e-commerce, and enterprise platforms.
          </p>

          <div className={styles.buttons}>
            <motion.a
              href="/assets/Dushyant_Tomar_React_Native_5Yrs.pdf"
              className={styles.btnPrimary}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View CV
            </motion.a>
            <motion.a
              href="#work"
              className={styles.btnOutline}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img src="/assets/Mobile-Hero-.webp" alt="Dushyant Tomar" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
