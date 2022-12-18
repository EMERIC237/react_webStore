import React from 'react'
import {Pro}

const Home = () => {
  return (
    <>
      HeroBanner
      <div className='products-heading'>
        <h2>Beset Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {['procuct1', 'product2', 'product3'].map((product) =>
          product
        )}
      </div>
      Footer
    </>
  )
}

export default Home