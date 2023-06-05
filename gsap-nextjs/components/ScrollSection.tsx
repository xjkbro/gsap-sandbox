"use client"
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

function ScrollSection() {
    const trigger = useRef(null)
    const list = useRef(null)
    gsap.registerPlugin(ScrollTrigger)
    useEffect(() => {
        const pin = gsap.fromTo(list.current, {
            translateX: 0,
        }, {
            translateX: "-600vw",
            duration: 1,
            scrollTrigger: {
                trigger: trigger.current,
                start: 'top top',
                end: '2000 top',
                scrub: 1,
                pin: true,
            }
        })
        return () => {
            pin.kill()
        }

    }, [])
    return (
        <div className='overflow-hidden'>
            <div ref={trigger}>
                <ul className='flex w-[700vw] h-screen relative bg-neutral-800' ref={list}>
                    <li className='grid w-screen h-screen place-content-center'>Scroll Section 1</li>
                    <li className='grid w-screen h-screen place-content-center'>Scroll Section 2</li>
                    <li className='grid w-screen h-screen place-content-center'>Scroll Section 3</li>
                    <li className='grid w-screen h-screen place-content-center'>Scroll Section 4</li>
                    <li className='grid w-screen h-screen place-content-center'>Scroll Section 5</li>
                    <li className='grid w-screen h-screen place-content-center'>Scroll Section 6</li>
                    <li className='grid w-screen h-screen place-content-center'>Scroll Section 7</li>
                </ul>
            </div>
        </div>
    )
}

export default ScrollSection