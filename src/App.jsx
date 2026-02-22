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
