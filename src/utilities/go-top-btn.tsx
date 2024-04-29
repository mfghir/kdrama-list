"use client"
import { ArrowUp } from 'lucide-react'
import React from 'react'

const GoTopBtn = ({showButton, backToTop }) => {


    return (

        <button
            type="button"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            id="btn-back-to-top"
            className={`fixed bottom-4 right-4 z-50  bg-blue-500 p-3 rounded-full
                        hover:bg-blue-800 transition-all

            ${
              showButton ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            // className="!fixed bottom-5 end-5 hidden rounded-full bg-red-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg"
         

            onClick={backToTop}

        >
            <ArrowUp />
        </button>

    )
}

export default GoTopBtn