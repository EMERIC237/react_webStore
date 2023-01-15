import React from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client'
import { ProductModel } from '../models/product.model'
import { bannerModel } from '../models/banner.model'
import { GetServerSideProps } from 'next'
type fetchedDataType = {
  products: ProductModel[],
  bannerData: bannerModel[]
}




const Home = ({ products, bannerData }: fetchedDataType) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {/* {console.log({ bannerData })}
      {console.log({ products })} */}
      <div className='products-heading'>
        <h2>Our Selling Products</h2>
        <p>Gadgets of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map((product) =>
          <Product key={product.id} product={product} />
        )}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

// we user getServerSideProps to get data from the server
export const getServerSideProps: GetServerSideProps<fetchedDataType> = async () => {
  const productQuery = "*[_type == 'product'] {'id':_id,name,images,slug,price,details,category}";
  const bannerQuery = "*[_type == 'banner'] {'id':_id,buttonText,desc,discount,image,largeText1,largeText2,midText,product,saleTime,smallText}";

  const products = await client.fetch(productQuery);

  const bannerData = await client.fetch(bannerQuery);
  return {
    props: { products, bannerData }
  }

}

export default Home