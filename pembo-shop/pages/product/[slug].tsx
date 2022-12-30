import React from 'react'
import { client, urlFor } from '../../lib/client'
import { GetStaticPaths } from 'next'

const ProductDetails = ({ product, products }: any) => {
    const { image, name, details, price } = product;
    console.log("this is image here: ", image)
    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                    <img src={urlFor(image)}  alt="headphones" />
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

