import React from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client'


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

// we user getServerSideProps to get data from the server
export const getServerSideProps = async () => {
  const query = '*[_type=="product"]';
  const products = await client.fetch(qu)
}

export default Home