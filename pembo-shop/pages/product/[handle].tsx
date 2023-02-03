import React, { useState } from 'react'
import Image from 'next/image'
import { GetStaticPaths } from 'next'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'
import { GetStaticProps } from 'next'
import { ProductModel } from '../../models/product.model'
import { shopifyClient, parseShopifyResponse } from '../../lib/client'
type handleDataProps = {
    products: ProductModel[],
    product: ProductModel
}

const ProductDetails = ({ product, products }: handleDataProps) => {
    // console.log('detail product: ', product)
    const { images, name, details, price } = product;
    const [index, setIndex] = useState(0)
    // check if the context is null
    const context = useStateContext();
    if (!context) {
        return null;
    }
    const { increaseQty, decreaseQty, qty, onAddItems } = context
    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <Image
                            src={(images && images[index]).src}
                            className="product-detail-image"
                            alt={name}
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className="small-images-container">
                        {images?.map((item, i) => (
                            <Image
                                key={i}
                                src={(item).src}
                                alt={name}
                                width={100}
                                height={100}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className="price">${price.amount}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decreaseQty}><AiOutlineMinus /></span>
                            <span className="num">{qty}</span>
                            <span className="plus" onClick={increaseQty}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={() => onAddItems(product, qty)}>Add to Cart</button>
                        <button type="button" className="buy-now" >Buy Now</button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    {/* <div className="maylike-products-container track">
                        {products.map((item) => (
                            <Product key={item.id} product={item} />
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ProductDetails

export const getStaticPaths: GetStaticPaths<{ handle: string }> = async () => {
    const products = await shopifyClient.product.fetchAll()
    const paths = products.map((product: any) => ({
        params: {
            handle: product.handle
        }
    }))
    return {
        paths, //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export const getStaticProps = async ({ params: { handle } }: any) => {
    // Fetch one product
    const fetchedProduct = await shopifyClient.product.fetchByHandle(handle)

    const parsedProduct = parseShopifyResponse(fetchedProduct)
    // console.log('test here', fetchedProduct.attrs)
    const product = {
        id: parsedProduct.id,
        images: parsedProduct.images,
        name: parsedProduct.title,
        price: parsedProduct.variants[0].price,
        details: parsedProduct.description,
    }
    return {
        props: { product }
    }
}

