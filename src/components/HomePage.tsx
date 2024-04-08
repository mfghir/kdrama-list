/* eslint-disable react/no-unescaped-entities */
"use client"

import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { ScrollArea } from './ui/scroll-area'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { ArrowRightIcon } from 'lucide-react'
import Footer from './Footer'

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { twMerge } from 'tailwind-merge'

// import {Parallax } from '@/utilities/Parallax'

const HomePage = ({ usersList }: any) => {
  // console.log("test" , test);

  // const ref = useRef();
  // useLayoutEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   gsap.from(ref.current, { opacity: 0, scale: 0 });
  //   gsap.to(ref.current, {
  //     opacity: 1,
  //     scale: 1,
  //     delay: custom * 0.3,
  //     ease: "power2",
  //     onComplete: animation,
  //   });
  // }, []);

  // const animation = () => {
  //   let tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ref.current,
  //       start: "top top",
  //       end: "bottom top",
  //       scrub: true,
  //     },
  //   });
  //   tl.set(ref.current, {
  //     transformOrigin: `${gsap.utils.random(0, 1) > 0.5 ? 0 : 100}% 100%`,
  //   });
  //   tl.to(ref.current, { scale: 0, ease: "none" });
  // };

  // gsap.registerPlugin(ScrollTrigger);

  // useEffect(() => {
  //   ScrollTrigger.create({
  //     start: 1,
  //     end: "max",
  //     onLeaveBack: self => self.scroll(ScrollTrigger.maxScroll(window) - 2),
  //     onLeave: self => self.scroll(2)
  //   }).scroll(2);
  // }, []);

  return (
    <>
      <section className="w-full h-full min-h-screen pt-28 pb-6 px-6 lg:px-20">

        <section className='mb-12 flex justify-center items-center flex-col relative'>
          <div className="w-full rounded-3xl min-h-[calc(100vh-120px)]
                bg-[url('https://i.postimg.cc/NjwS7txJ/Design.gif')] 
                bg-no-repeat bg-center bg-cover brightness-50"></div>

          <div className="absolute flex justify-center items-center flex-col gap-y-4">
            <p className="text-7xl font-bold mx-auto z-10">KDrama</p>
            <p className="text-lg lg:text-3xl mx-auto z-10">Welcome to the world of kdrama fans</p>
            <Button variant="expandIcon" Icon={ArrowRightIcon} iconPlacement="right">Lets Go</Button>
          </div>
        </section>


        <section className=''>
        {/* <Parallax speed={1} className="self-start"> */}
          <p className="text-4xl font-bold mb-4">Fans' list</p>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-11"
          // ref={ref}
          >
            {usersList.map((item: any) => (
              <div key={item.name} className="group relative ">

                <div className="group before:hover:scale-95 min-w-80 w-full before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl  from-fuchsia-500 to-cyan-500 before:absolute before:top-0  h-72 relative bg-zinc-800 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
                  <div className="w-28 h-28 bg-blue-700 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500 overflow-hidden">
                    <Image
                      src={item.imgUrl}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="z-10  group-hover:-translate-y-10 transition-all duration-500">
                    <span className="text-2xl font-semibold">{item.name}</span>
                    <p>{item.email}</p>
                  </div>

                  <Link href={`/${item._id}`} className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500">
                    See More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {/* </Parallax> */}
        </section>

        <Footer />
      </section>
    </>

  )
}

export default HomePage