import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const isBlogDetail = location.pathname.startsWith('/blog/');

    return (
        <footer style={{
            background: '#25283e',
            padding: '40px 0',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '1rem',
            position: 'relative',
            zIndex: 100
        }}>
            {isBlogDetail && (
                <p style={{
                    fontSize: '0.85rem',
                    fontStyle: 'italic',
                    color: 'rgba(255, 255, 255, 0.4)',
                    marginBottom: '10px'
                }}>
                    Content on this site includes research notes curated and summarized from multiple sources and production experience.
                </p>
            )}
            <p>&copy; {new Date().getFullYear()} Dushyant Singh Tomar. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
