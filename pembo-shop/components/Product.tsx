import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ProductModel } from '../models/product.model'

const Product = ({ product }: ProductModel | any) => {


  const { images, name, handle, price, details, category } = product
  return (
    <div>
      <Link href={`/product/${handle}`}>
        <div className="product-card">
          <Image src={images[0].src}
            className="product-image"
            alt="product"
            width={250}
            height={250} />
          <p className="product-name">{name}</p>
          <p className="product-price">XAF {price.amount}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product