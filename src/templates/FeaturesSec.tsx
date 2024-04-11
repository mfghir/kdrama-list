"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap";

const data = [
  { bg: "bg-gradient-to-r from-indigo-500 to-blue-500", title: "Find Your Favorites", description: "Browse through a vast collection of top-rated dramas and discover your next obsession." },
  { bg: "bg-gradient-to-r from-fuchsia-600 to-purple-600", title: "Stay Up to Date", description: "Never miss an episode with real-time updates and notifications for your favorite shows." },
  { bg: "bg-gradient-to-r from-violet-600 to-indigo-600", title: "Join the Community", description: "Connect with fellow drama enthusiasts, share your thoughts, and engage in lively discussions." }
]


const FeaturesSec = () => {

  const comp = useRef(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline()

      t1.from("#feat-sec1", {
        duration: 2,
        scale: 0.8,
        opacity: 0,
        delay: 0.8,
        background: "bg-fuchsia-500",
        ease: "power4.inOut",
      }, "<")

        .from("#feat-sec2", {
          duration: 2,
          scale: 0.8,
          opacity: 0,
          delay: 0.4,
          ease: "power4.inOut",
        }, "<")

        .from("#feat-sec3", {
          duration: 2,
          scale: 0.8,
          opacity: 0,
          delay: 0.6,
          ease: "power4.inOut",
        }, "<")

    }, comp)

    return () => ctx.revert()
  }, [])





  return (
    <>
      {data.map((item, index) =>
        <div id={`feat-sec${index}`} key="title" className={`flex flex-col gap-y-2 px-4 py-8 ${item.bg} rounded-xl`}>
          <p className="text-2xl g:text-3xl font-black  
              bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent"
          >
            {item.title}
          </p>
          <p className="text-sm lg:text-lg text-zinc-300">{item.description}</p>
        </div>
      )}
    </>
  )
}

export default FeaturesSec