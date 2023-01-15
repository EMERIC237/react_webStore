import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import { ProductModel } from '../models/product.model'

const Product = ({ product }: ProductModel | any) => {

  const { images, name, slug, price, details, category } = product
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img src={urlFor(images && images[0]).url()}
            alt="product"
            width={250}
            height={250}
            className="product-image" />
          <p className="product-name">{name}</p>
          <p className="product-price">XAF {price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product