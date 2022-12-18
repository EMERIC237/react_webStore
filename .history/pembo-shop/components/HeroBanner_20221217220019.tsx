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
                <Image src={urlFor(heroBanner.image)} alt="headphones" className='hero-banner-image' width={500}
        height={500}/>
                <div>
                    <Link href="/product/ID">
                        <button type='button'>CLICK HERE</button>
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