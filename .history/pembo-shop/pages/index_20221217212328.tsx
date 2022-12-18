import React from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'
import clien

const Home = () => {
  return (
    <>
      <HeroBanner />
      <div className='products-heading'>
        <h2>Beset Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {['procuct1', 'product2', 'product3'].map((product) =>
          product
        )}
      </div>
      <FooterBanner />
    </>
  )
}

export default Home