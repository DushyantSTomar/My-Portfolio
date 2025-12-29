import React, { useState, useEffect } from 'react';
import { Menu, X, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Work', path: '/#work' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-primary/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:text-accent transition-colors">
            <Code className="text-accent" />
            <span>DST</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.path}
                className="text-text-muted hover:text-accent font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="/#contact" 
              className="bg-accent text-primary px-5 py-2 rounded-full font-semibold hover:bg-white transition-all transform hover:scale-105"
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-text hover:text-accent"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-secondary shadow-xl py-6 animate-fade-in">
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="text-lg font-medium text-text-muted hover:text-accent"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
