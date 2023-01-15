import React, { useState } from 'react'
import { client, urlFor } from '../../lib/client'
import { GetStaticPaths } from 'next'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'
import { GetStaticProps } from 'next'
import { ProductModel } from '../../models/product.model'
type slugDataProps = {
    products: ProductModel[],
    product: ProductModel
}

const ProductDetails = ({ product, products }: slugDataProps) => {
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
                        <img src={urlFor(images && images[index])} className="product-detail-image" />
                    </div>
                    <div className="small-images-container">
                        {images?.map((item, i) => (
                            <img
                                key={i}
                                src={urlFor(item)}
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
                    <p className="price">${price}</p>
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
                    <div className="maylike-products-container track">
                        {products.map((item) => (
                            <Product key={item.id} product={item} />
                        ))}
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

export const getStaticProps: GetStaticProps<slugDataProps> = async ({ params: { slug } }: any) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0] {'id':_id,name,images,slug,price,details,category}`;
    const productsQuery = `*[_type == "product"] {'id':_id,name,images,slug,price,details,category}`

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
    console.log(product)
    console.log(products)

    return {
        props: { products, product }
    }
}

