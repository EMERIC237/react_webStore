import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const Product = ({ product: { image, name, slug, price } }: any) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        div.product
      </Link>
    </div>
  )
}

export default Product