import React from 'react';
import styles from './About.module.scss';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="Aboutme" className={styles.about}>
            <div className={styles.container}>
                <motion.div
                    className={styles.titleWrapper}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}>
                    <h1 className={styles.bigTitle}>About Me</h1>
                </motion.div>

                <div className={styles.content}>
                    <motion.div
                        className={styles.text}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}>
                        <h2>I'm a Developer</h2>
                        <p>
                            React Developer with 5+ years of experience delivering scalable mobile and web applications using React Native, ReactJS, Node.js, Express, Firebase, and Redux Toolkit.
                        </p>
                        <p>
                            Proven ability to lead development teams, collaborate with cross-functional stakeholders, and implement CI/CD pipelines to streamline deployment. Skilled in optimizing app performance and ensuring code quality.
                        </p>
                        <div className={styles.skillsGrid}>
                            <div className={styles.skillCard}>
                                <img src="/assets/frontend_illustration.png" alt="Frontend" />
                                <h3>Frontend</h3>
                                <p>React Native, ReactJS, Redux Toolkit, Hooks, TypeScript, JavaScript ES6+</p>
                            </div>
                            <div className={styles.skillCard}>
                                <img src="/assets/devops_illustration.png" alt="Tools / DevOps" />
                                <h3>Tools / DevOps</h3>
                                <p>Docker, Git, GitHub Actions (CI/CD), Jest, Android Studio, Xcode</p>
                            </div>
                            <div className={styles.skillCard}>
                                <img src="/assets/backend_illustration.png" alt="Backend" />
                                <h3>Backend</h3>
                                <p>Node.js, Express.js, REST APIs, Firebase, MongoDB</p>
                            </div>
                            <div className={styles.skillCard}>
                                <img src="/assets/other_illustration.png" alt="Other" />
                                <h3>Other</h3>
                                <p>Agile Scrum, UI Optimization, API Integration</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
