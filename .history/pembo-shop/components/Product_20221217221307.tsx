import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const Product = ({ product: { image, name, slug, price } }: any) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img src={urlFor(image && image[0])}
          width={250}
          height={250}
          className="product-imag"
        </div>
      </Link>
    </div>
  )
}

export default Product