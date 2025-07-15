"use client"

import { type ReactNode, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ImagesSliderProps {
  images: string[]
  className?: string
  interval?: number // ms
  children?: ReactNode
}

export default function ImagesSlider({ images, interval = 6000, className, children }: ImagesSliderProps) {
  const [index, setIndex] = useState(0)

  // auto-play
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(id)
  }, [images.length, interval])

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={images[index]}
          alt={`Slide ${index + 1}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-blue-900/60 to-gray-900/80" />
      <div className="relative z-10 flex items-center justify-center h-full">{children}</div>
    </div>
  )
}
