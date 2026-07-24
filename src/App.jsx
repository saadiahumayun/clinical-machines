import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Products from './components/Products'
import Stats from './components/Stats'
import Why from './components/Why'
import Research from './components/Research'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  // Global scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    const els = document.querySelectorAll('.reveal')
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <Products />
      <Stats />
      <Why />
      <Research />
      <CTA />
      <Footer />
    </>
  )
}
