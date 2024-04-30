"use client"

import { ArrowUp } from 'lucide-react'

const GoTopBtn = ({ showButton, backToTop }:
  {
    showButton: boolean,
    backToTop: () => void
  }) => {

  return (
    <button
      type="button"
      data-twe-ripple-init
      data-twe-ripple-color="light"
      id="btn-back-to-top"
      onClick={backToTop}
      className={`fixed bottom-4 right-4 z-50  bg-blue-500 p-3 rounded-full hover:bg-blue-800 transition-all
                  ${showButton ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
    >
      <ArrowUp />
    </button>

  )
}

export default GoTopBtn