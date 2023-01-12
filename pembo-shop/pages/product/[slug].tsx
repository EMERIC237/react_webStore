import React, { useState } from 'react'
import { client, urlFor } from '../../lib/client'
import { GetStaticPaths } from 'next'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'

const ProductDetails = ({ product, products }: any) => {
    const { Image: image, name, details, price } = product;
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
                        <img src={urlFor(image && image[index])} className='product-detail-image' alt={name} />
                    </div>
                    <div className="small-images-container">
                        {image?.map((item: any, i: number) => (
                            <img src={urlFor(item)} className={i === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={() => setIndex(i)} alt='' key={i} />
                        ))}
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
                        <h4>Details:</h4>
                        <p>{details}</p>
                        <p className='price'>XAF {price}</p>
                        <div className="quantity">
                            <h3>Quantity:</h3>
                            <p className="quantity-desc">
                                <span className="minus" onClick={decreaseQty}>
                                    <AiOutlineMinus />
                                </span>
                                <span className="num">
                                    {qty}
                                </span>
                                <span className="plus" onClick={increaseQty}>
                                    <AiOutlinePlus />
                                </span>

                            </p>
                        </div>
                        <div className="buttons">
                            <button type='button' className='add-to-cart' onClick={() => onAddItems(product, qty)}>Add to cart</button>
                            <button type='button' className='buy-now'>Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="maylike-products-wrapper">
                    <h2>You may also like</h2>
                    <div className="marquee">
                        <div className="maylike-products-container track">
                            {products.map((item: any) => (
                                <Product key={item._id} product={item} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductDetails

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    const query = `*[_type == "product"]{
        slug{
            current
        }
    }
    `;
    const products = await client.fetch(query);
    const paths = products.map((product: any) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths, //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export const getStaticProps = async ({ params: { slug } }: any) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = `*[_type == "product"]`
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    return {
        props: { products, product }
    }
}

