import React, { useRef } from 'react';
import styles from './Contact.module.scss';
import { Phone, Mail, MapPin, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';


const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        const formData = new FormData(form.current);
        const data = {
            name: formData.get('user_name'),
            email: formData.get('user_email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            _subject: `New submission from ${formData.get('user_name')}`, 
        };

        fetch("https://formsubmit.co/ajax/singhdushyant060@gmail.com", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                alert('Message sent successfully! Check your email to confirm the first submission.');
                e.target.reset();
            })
            .catch(error => {
                console.error('FAILED...', error);
                alert('Failed to send message. Please try again later.');
            });
    };

    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.container}>
                <motion.div
                    className={styles.info}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>Get In Touch</h2>
                    <p>I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>

                    <div className={styles.details}>
                        <div className={styles.item}>
                            <Phone className={styles.icon} />
                            <a href="tel:+916232639770" style={{ color: 'inherit', textDecoration: 'none' }}>+91-6232639770</a>
                        </div>
                        <div className={styles.item}>
                            <Mail className={styles.icon} />
                            <a href="mailto:singhdushyant060@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>singhdushyant060@gmail.com</a>
                        </div>
                        <div className={styles.item}>
                            <MapPin className={styles.icon} />
                            <span>Bangalore, India</span>
                        </div>
                    </div>

                    <div className={styles.socials}>
                        <a href="https://www.linkedin.com/in/dushyant-tomar-2079a8249/" target="_blank" rel="noreferrer"><Linkedin /></a>
                        {/* Assuming Github exists or placeholder */}
                        <a href="https://github.com/DushyantSTomar?tab=repositories" target="_blank" rel="noreferrer"><Github /></a>
                    </div>
                </motion.div>

                <motion.form
                    ref={form}
                    onSubmit={sendEmail}
                    className={styles.form}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3>Say Something</h3>
                    <input type="text" name="user_name" placeholder="Name" required />
                    <input type="email" name="user_email" placeholder="Email" required />
                    <input type="text" name="subject" placeholder="Subject" />
                    <textarea name="message" placeholder="Message" rows="5" required></textarea>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Send Message
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
