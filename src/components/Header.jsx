import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { Menu, X } from 'lucide-react';
import MemoryGame from './MemoryGame';
import { AnimatePresence } from 'framer-motion';

const Header = () => {
    const [gameOpen, setGameOpen] = useState(false);

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About me', path: '/#Aboutme' },
        { name: 'Portfolio', path: '/#work' },
        { name: 'Blogs', path: '/blogs' },
        { name: 'Contact', path: '/#contact' }
    ];

    // Note: Implementing scroll-to-id for single page behavior while using NavLink for structure
    const scrollToSection = (id) => {
        // Extract the actual ID if it accidentally includes '/' like '/#Aboutme'
        const cleanId = id.includes('#') ? id.substring(id.indexOf('#')) : id;
        const element = document.querySelector(cleanId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false);
        } else if (window.location.pathname !== '/') {
            // If we're not on home and the element isn't found, 
            // the NavLink will handle routing to '/' and putting the hash in URL
        }
    };

    return (
        <>
            <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <img src="/assets/Dushyant-Portfolio-Logo-1.webp" alt="Logo" />
                    </div>

                    <div className={styles.mobileToggle} onClick={toggleMenu}>
                        {menuOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
                    </div>

                    <nav className={`${styles.nav} ${menuOpen ? styles.active : ''}`}>
                        <ul>
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={link.path}
                                        onClick={(e) => {
                                            if (link.path.includes('#')) {
                                                if (window.location.pathname === '/' || window.location.pathname === '') {
                                                    e.preventDefault();
                                                    scrollToSection(link.path);
                                                }
                                            } else {
                                                setMenuOpen(false);
                                            }
                                        }}
                                        className={({ isActive }) =>
                                            // Handle exact match for home or actual route match for /blogs
                                            (isActive && link.path === '/blogs') ? styles.activeLink : ''
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => setGameOpen(true)}
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        color: 'white',
                                        padding: '5px 15px',
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        fontFamily: 'inherit',
                                        marginLeft: '10px'
                                    }}
                                >
                                    Play 🎮
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <AnimatePresence>
                {gameOpen && <MemoryGame onClose={() => setGameOpen(false)} />}
            </AnimatePresence>
        </>
    );
};

export default Header;
