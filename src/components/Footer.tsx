"use client"

import { Dribbble, Github, Instagram, Linkedin, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from './ui/button';
import { useLenis } from '@studio-freight/react-lenis';

const Footer = () => {

  const lenis = useLenis(({ scroll }) => {
    // called every scroll
    console.log(scroll);
  });


  return (


    <footer className="w-full text-gray-200 bg-zinc-900 body-font rounded-xl mt-12">
      <section className="container w-full flex justify-between flex-wrap md:flex-nowrap gap-y-12 p-6">
        <div className="w-full flex flex-col gap-y-6">
          <div className='w-full flex flex-col gap-y-1'>
            <Link href="/">
              <Image
                className="w-16 h-16 rounded-full object-cover origin-center"
                width={70}
                height={70}
                src="https://i.postimg.cc/rwwCstjZ/kdrama-logo.jpg"
                alt="logo"
              />
            </Link>
            <p className="text-base text-gray-50">Design, Code and Ship!</p>
          </div>

          <ul className="flex justify-start items-center gap-x-3 text-gray-50">
            <li className="hover:text-blue-500 duration-300">
              <a
                href="https://t.me/fatemeweb"
                target="_blank"
                rel="noreferrer"
              >
                <Send />
              </a>
            </li>

            <li className="text-2xl hover:text-blue-500 duration-300">
              <a
                href="https://www.instagram.com/fatemeweb/"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram />
              </a>
            </li>

            <li className="text-2xl hover:text-blue-500 duration-300">
              <a
                href="https://www.linkedin.com/in/fateme-ghafari"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin />
              </a>
            </li>

            <li className="text-2xl hover:text-blue-500 duration-300">
              <a
                href="https://github.com/mfghir"
                target="_blank"
                rel="noreferrer"
              >
                <Github />
              </a>
            </li>

            <li className="text-2xl hover:text-blue-500 duration-300">
              <a
                href="https://dribbble.com/fatemeweb"
                target="_blank"
                rel="noreferrer"
              >
                <Dribbble />
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <h2 className=" text-lg font-bold tracking-widest text-white uppercase title-font">Links</h2>
          <nav className="list-none flex flex-col gap-y-1">
            <li className="">
              <a className="text-gray-50 cursor-pointer hover:text-blue-500 transition-all">About me</a>
            </li>
            <li className="">
              <a className="text-gray-50 cursor-pointer hover:text-blue-500 transition-all">Git</a>
            </li>
            <li className="">
              <a className="text-gray-50 cursor-pointer hover:text-blue-500 transition-all">Terms & Privacy</a>
            </li>
          </nav>
        </div>

        <Button
          onClick={() => lenis?.scrollTo("#start-sec", { lerp: 0.02 })}
          className='bg-zinc-800 text-white px-6'
          variant="gooeyLeft"
        >Go Up</Button>
      </section>

      <div className="bg-zinc-800">
        <div className="container px-5 py-4 mx-auto">
          <p className="text-sm text-gray-100 capitalize xl:text-center">©2024 All rights reserved </p>
        </div>
      </div>
    </footer>

  )
}

export default Footer



