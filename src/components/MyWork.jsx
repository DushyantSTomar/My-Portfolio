import React, { useState } from 'react';
import styles from './MyWork.module.scss';
import { motion } from 'framer-motion';
import ProjectModal from './ProjectModal';

const projects = [
    {
        id: 1,
        title: 'Retail Eazy',
        img: '/assets/retail-Eazy-.png',
        gallery: [
            '/assets/projects/retail-eazy/1.webp',
            '/assets/projects/retail-eazy/2.webp',
            '/assets/projects/retail-eazy/3.webp',
            '/assets/projects/retail-eazy/4.webp',
            '/assets/projects/retail-eazy/5.webp',
            '/assets/projects/retail-eazy/6.webp'
        ]
    },
    {
        id: 2,
        title: 'Eazy Office',
        img: '/assets/Untitled-design-2.webp',
        gallery: [
            '/assets/projects/eazy-office/1.webp',
            '/assets/projects/eazy-office/2.webp',
            '/assets/projects/eazy-office/3.webp',
            '/assets/projects/eazy-office/5.webp',
            '/assets/projects/eazy-office/6.webp'
        ]
    },
    {
        id: 3,
        title: 'Eazy ERP',
        img: 'assets/retail-Eazy-.png',
        gallery: [
            '/assets/projects/eazy-erp/1.webp',
            '/assets/projects/eazy-erp/2.webp',
            '/assets/projects/eazy-erp/3.webp',
            '/assets/projects/eazy-erp/4.webp',
            '/assets/projects/eazy-erp/5.webp'
        ]
    },
    {
        id: 4,
        title: 'Green Samriddhi',
        img: '/assets/Green-Samriddhi.png',
        gallery: [
            '/assets/projects/green-samriddhi/1.webp',
            '/assets/projects/green-samriddhi/2.webp',
            '/assets/projects/green-samriddhi/3.webp'
        ]
    },
    {
        id: 5,
        title: 'Crompton Parivaar',
        img: '/assets/Crompton-Parivaar.png',
        gallery: [
            '/assets/projects/crompton-parivaar/1.webp',
            '/assets/projects/crompton-parivaar/2.webp',
            '/assets/projects/crompton-parivaar/3.webp',
            '/assets/projects/crompton-parivaar/4.webp'
        ]
    },
    {
        id: 6,
        title: 'Smartfren Viva',
        img: '/assets/smartfren-Viva.png',
        gallery: [
            '/assets/projects/smartfren-viva/1.webp',
            '/assets/projects/smartfren-viva/2.webp',
            '/assets/projects/smartfren-viva/3.webp',
            '/assets/projects/smartfren-viva/4.webp',
            '/assets/projects/smartfren-viva/5.webp',
            '/assets/projects/smartfren-viva/6.webp',
            '/assets/projects/smartfren-viva/7.webp',
            '/assets/projects/smartfren-viva/8.webp'
        ]
    },
    {
        id: 7,
        title: 'Sales Algeria',
        img: '/assets/Ooredoo-Algeria.png',
        gallery: [
            '/assets/projects/ooredoo-qatar/1.jpeg',
            '/assets/projects/ooredoo-qatar/2.jpeg',
            '/assets/projects/ooredoo-qatar/3.jpeg',
            '/assets/projects/ooredoo-qatar/4.jpeg',
            '/assets/projects/ooredoo-qatar/5.jpeg'
        ]
    },
    {
        id: 8,
        title: 'Ooredoo Qatar',
        img: '/assets/Ooredoo-Qatar-1-1.png',
        gallery: [
            '/assets/projects/sales-algeria/1.webp',
            '/assets/projects/sales-algeria/2.webp',
            '/assets/projects/sales-algeria/3.webp',
            '/assets/projects/sales-algeria/4.webp',
            '/assets/projects/sales-algeria/5.webp',
            '/assets/projects/sales-algeria/6.webp',
            '/assets/projects/sales-algeria/7.webp'
        ]
    }
];

const MyWork = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    return (
        <section id="work" className={styles.work}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>My Work</h1>
                    <div className={styles.line}></div>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            className={styles.card}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            onClick={() => handleProjectClick(project)}
                        >
                            <div className={styles.imageBox}>
                                <img src={project.img} alt={project.title} />
                                <div className={styles.overlay}>
                                    <h3>{project.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <ProjectModal
                isOpen={!!selectedProject}
                onClose={handleCloseModal}
                project={selectedProject}
            />
        </section >
    );
};

export default MyWork;
