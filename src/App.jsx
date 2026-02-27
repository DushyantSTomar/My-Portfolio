import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import MyWork from './components/MyWork'
import TechCarousel from './components/TechCarousel'
import Blogs from './components/Blogs'
import BlogListing from './components/BlogListing'
import BlogDetail from './components/BlogDetail'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ThemeProvider } from './context/ThemeContext'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import ThemeToggle from './components/ThemeToggle'

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small timeout to ensure the DOM is fully rendered before scrolling
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [hash, pathname]);

  return null;
};

const Home = () => (
  <>
    <Hero />
    <About />
    <MyWork />
    <TechCarousel />
    <Blogs />
    <Contact />
  </>
)

function App() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <ThemeToggle />
      <Header />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogListing />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
      <Footer />
      <BackToTop />
    </ThemeProvider>
  )
}

export default App
