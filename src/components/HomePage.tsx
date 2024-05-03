/* eslint-disable react/no-unescaped-entities */
"use client"

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { ArrowRightIcon } from 'lucide-react'

import Footer from './Footer'
import FeaturesSec from '@/templates/FeaturesSec'
import GoTopBtn from '@/utilities/go-top-btn'

import gsap from "gsap";
import { useLenis } from '@studio-freight/react-lenis'
import SearchBar from '@/templates/search-bar'




// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const HomePage = ({ usersList }: any) => {

  const lenis = useLenis(({ scroll }) => {
    // called every scroll
    // console.log(scroll);
  });

  const comp = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline()

      t1.from("#feat-sec1", {
        duration: 2,
        scale: 0.8,
        opacity: 0,
        ease: "power4.inOut",
      }, "<")

        .from("#feat-sec2", {
          duration: 2,
          scale: 0.8,
          opacity: 0,
          delay: 0.2,
          ease: "power4.inOut",
        }, "<")

        .from("#feat-sec3", {
          duration: 2,
          scale: 0.8,
          opacity: 0,
          delay: 0.4,
          ease: "power4.inOut",
        }, "<")


        .from(["#fans-title"], {
          opacity: 0,
          x: "-=300",
          stagger: 0.5,
          scrub: 1,
        })
        .to(["#fans-title"], {
          opacity: 1,
          delay: 0.1,
          stagger: 0.5,
        })

        .from("#fans-sec", {
          duration: 1,
          scale: 0.7,
          opacity: 0,
          stagger: 0.2,

          scrub: true,
          delay: 0.3,
          start: "top top",
          ease: "power4.inOut",
        }, "<")

    }, comp)

    return () => ctx.revert()
  }, [])



  const [showButton, setShowButton] = useState(false);

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 600 ||
      document.documentElement.scrollTop > 600
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    return () => window.removeEventListener("scroll", scrollFunction);
  }, []);


  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(usersList);


  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);

    if (searchTerm === '') {
      setSearchResults(usersList);
    } else {
      const filteredResults = usersList.filter((user: any) => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(filteredResults);
    }
  };

  const highlightSearchTerm = (text: string, searchTerm: string) => {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };


  return (
    <>
      <section ref={comp} className="w-full h-full min-h-screen pt-28 pb-6 px-6 lg:px-20">
        {/* <Parallax speed={1} className="self-start"> */}
        <section className='flex justify-center items-center flex-col relative' id='start-sec'>
          <div className="w-full rounded-3xl min-h-[calc(100vh-120px)]
                bg-[url('https://i.postimg.cc/NjwS7txJ/Design.gif')] 
                bg-no-repeat bg-center bg-cover brightness-50" />

          <div className="absolute flex justify-center items-center flex-col gap-y-4">
            <p className="text-5xl lg:text-7xl font-bold z-10 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">KDrama</p>
            <p className="text-lg lg:text-3xl text-center z-10">Welcome to the world of kdrama fans</p>
            <Button
              variant="expandIcon"
              Icon={ArrowRightIcon}
              iconPlacement="right"
              onClick={() => lenis?.scrollTo("#fans-title", { lerp: 0.02 })}
            >
              Let's Go
            </Button>
          </div>
        </section>
        {/* </Parallax> */}

        <section className='w-full grid grid-cols-1 gap-y-4 lg:grid-cols-3 gap-x-12 my-28'>
          <FeaturesSec />
        </section>

        {/* <Parallax speed={2} className="self-end"> */}
        <section>
          <div className="w-full flex justify-between items-center flex-wrap gap-y-2 mb-4">
            <p id='fans-title' className="text-4xl font-bold">Fans' list</p>
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="min-h-max grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-11">
            <>
              {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
              {
                searchResults.length === 0 && searchTerm !== '' ?
                  (
                    <p className="text-center text-lg text-gray-600 col-span-full">
                      No results found for "{searchTerm}"
                    </p>
                  )
                  :
                  (
                    searchResults.map((item: any) => (
                      <div id="fans-sec" key={item.name} className="group relative ">
                        <div className="group before:hover:scale-95 min-w-80 w-full before:hover:w-80 before:hover:h-44 
                    before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 
                    before:rounded-t-2xl before:bg-gradient-to-bl  from-fuchsia-500 to-cyan-500 before:absolute before:top-0  
                    h-72 relative bg-zinc-100 dark:bg-zinc-800 flex flex-col items-center justify-center gap-2 
                    text-center rounded-2xl overflow-hidden">
                          <div className="w-28 h-28 bg-blue-700 mt-8 rounded-full border-4 border-slate-50 z-10 
                      group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 
                      transition-all duration-500 overflow-hidden">
                            {!item.imgUrl ?
                              <Skeleton className="h-full w-full" />
                              :
                              <Image
                                src={item.imgUrl}
                                alt={item.name}
                                width={200}
                                height={200}
                                className="h-full w-full object-cover object-center"
                              />}
                          </div>

                          <div className="z-10  group-hover:-translate-y-10 transition-all duration-500">
                            <span className="text-2xl font-semibold">
                              {highlightSearchTerm(item.name, searchTerm) !== item.name ? (
                                <span dangerouslySetInnerHTML={{ __html: highlightSearchTerm(item.name, searchTerm) }} />
                              ) : (
                                <>
                                  {!item.name ?
                                    <Skeleton className="h-full w-full" />
                                    :
                                    <>{item.name}</>
                                  }
                                </>
                              )}
                            </span>

                            <p className='text-sm text-zinc-500'>
                              {!item.email ?
                                <Skeleton className="h-full w-full" />
                                :
                                <>{item.email}</>
                              }
                            </p>
                          </div>

                          <Link
                            href={`/${item._id}`}
                            className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500"
                          >
                            See More
                          </Link>
                        </div>
                      </div>
                    ))
                  )
              }
            </>
          </div>
        </section>
        {/* </Parallax> */}


        <GoTopBtn backToTop={backToTop} showButton={showButton} />
        <Footer />
      </section>
    </>

  )
}

export default HomePage