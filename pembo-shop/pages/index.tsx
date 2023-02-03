import React from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'
import { shopifyClient, parseShopifyResponse } from '../lib/client'
import { ProductModel } from '../models/product.model'
import { bannerModel } from '../models/banner.model'
import { GetServerSideProps } from 'next'
type fetchedDataType = {
  products: ProductModel[],
  bannerData?: bannerModel[]
}




const Home = ({ products, bannerData }: fetchedDataType) => {
  return (
    <>
      {
        bannerData ? (<HeroBanner heroBanner={bannerData.length && bannerData[0]} />) : null
      }

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
      {
        bannerData ? (<FooterBanner footerBanner={bannerData && bannerData[0]} />) : null
      }

    </>
  )
}

// we user getServerSideProps to get data from the server
export const getServerSideProps: GetServerSideProps = async () => {
  //Fetch all the products
  const products: ProductModel[] = []
  const fetchedProducts = await shopifyClient.product.fetchAll()

  fetchedProducts.forEach((fetchedProduct: any) => {
    console.log({fetchedProduct})
    // fetchedProduct.variants.forEach((t:any)=>{
    //   console.log(t.image.src)
    // })
    // const product: ProductModel = {}
    // product.id = fetchedProduct.id;
    // product.images = fetchedProduct.image
    // product.name = fetchedProduct.title
    // product.price = fetchedProduct.variants[0].price
    // product.details = fetchedProduct.description
    // product.category = fetchedProduct.productType
    // product.handle = fetchedProduct.handle
    products.push({
      id: fetchedProduct.id,
      images: fetchedProduct.images,
      name: fetchedProduct.title,
      price: fetchedProduct.variants[0].price,
      details: fetchedProduct.description,
      category: fetchedProduct.productType,
      handle: fetchedProduct.handle
    })
  })

  return {
    props: { products: parseShopifyResponse(products) }
  }

}

export default Home