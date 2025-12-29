import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import MyWork from './components/MyWork'
import TechCarousel from './components/TechCarousel'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ThemeProvider } from './context/ThemeContext'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <ThemeToggle />
      <Header />
      <Hero />
      <About />
      <MyWork />
      <TechCarousel />
      <Contact />
      <Footer />
      <BackToTop />
    </ThemeProvider>
  )
}

export default App
