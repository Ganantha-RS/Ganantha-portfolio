import React from 'react'
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import About from '@/components/About';
import Work from '@/components/Work';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';

const LandingPage = ({ loaded }) => {
  return (
    <div className='bg-black'>
      <Navbar />
      <Hero loaded={loaded} />
      <About />
      <Work />
      <Experience />
      <Contact />
    </div>
  )
}

export default LandingPage

