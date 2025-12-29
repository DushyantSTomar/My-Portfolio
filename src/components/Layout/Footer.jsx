import React from 'react';
import { Github, Linkedin, Mail, Phone, ChevronUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-gray-700 pb-10">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Let's Connect</h2>
            <p className="text-text-muted">Open to new opportunities.</p>
          </div>
          <div className="flex gap-6">
            <a href="mailto:singhdushyant060@gmail.com" className="p-3 bg-primary rounded-full hover:bg-accent hover:text-primary transition-colors">
              <Mail size={24} />
            </a>
            <a href="https://www.linkedin.com/in/dushyant-tomar-2079a8249/" className="p-3 bg-primary rounded-full hover:bg-accent hover:text-primary transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="tel:+916232639770" className="p-3 bg-primary rounded-full hover:bg-accent hover:text-primary transition-colors">
              <Phone size={24} />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-text-muted text-sm">
          <p>© 2025 Dushyant Singh Tomar. All rights reserved.</p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-accent transition-colors mt-4 md:mt-0"
          >
            Back to Top <ChevronUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
