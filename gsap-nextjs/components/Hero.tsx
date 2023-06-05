"use client"
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

function Hero() {
    const title = useRef(null)
    useEffect(() => {
        gsap.from(title.current, {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            delay: 1
        })
    }, [])
    return (
        <div className='grid w-full h-screen place-content-center'>
            <h1 ref={title} className='text-6xl font-bold'>Hero</h1>
        </div>
    )
}

export default Hero