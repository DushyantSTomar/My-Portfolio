import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            background: '#25283e',
            padding: '30px 0',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.9rem'
        }}>
            <p>&copy; {new Date().getFullYear()} Dushyant Singh Tomar. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
