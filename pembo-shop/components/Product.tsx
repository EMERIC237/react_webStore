import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../lib/client'
import { ProductModel } from '../models/product.model'

const Product = ({ product }: ProductModel | any) => {

  const { images, name, slug, price, details, category } = product
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image src={urlFor(images && images[0]).url()}
            className="product-image"
            alt="product"
            width={250}
            height={250} />
          <p className="product-name">{name}</p>
          <p className="product-price">XAF {price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product