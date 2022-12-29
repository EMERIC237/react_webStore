import React from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client'


const Home = ({ products, bannerData }: any) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {/* {console.log({ bannerData })}
      {console.log({ products })} */}
      <div className='products-heading'>
        <h2>Beset Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map((product: any) =>
          <Product key={product._id} product={product} />
        )}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

// we user getServerSideProps to get data from the server
export const getServerSideProps = async () => {
  const productQuery = '*[_type=="product"]';
  const bannerQuery = '*[_type=="banner"]';
  const products = await client.fetch(productQuery);
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }

}

export default Home