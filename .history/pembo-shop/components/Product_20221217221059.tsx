import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const Product = ({ product: { image, name, slug, price } }: any) => {
  return (
    <div>
      <Link href={`/produc`}></Link>
    </div>
  )
}

export default Product