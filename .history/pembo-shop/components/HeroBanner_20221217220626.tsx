import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../lib/client'

const HeroBanner = ({ heroBanner }: any) => {
    return (
        <div className="hero-banner-container">
            <div>
                <p className="beats-solo">{heroBanner.smallText}</p>
                <h3>{heroBanner.midText}</h3>
                <h1>{heroBanner.largeText1}</h1>
                <img src={urlFor(heroBanner.image).url()} alt="headphones" className='hero-banner-image' />
                <div>
                    <Link href={`/products/${heroBanner.product}`}>
                        <button type='button'>{h}</button>
                    </Link>
                    <div className="desc">
                        <h5>Description</h5>
                        <p>This is the description here !!!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner