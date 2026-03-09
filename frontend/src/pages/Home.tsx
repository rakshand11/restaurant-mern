import React from 'react'
import Hero from '../components/Hero'
import Menu from '../components/Menu'
import Categories from '../components/Categories'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <Menu />
      <NewsLetter />
      <Testimonial />
    </div>
  )

}

export default Home