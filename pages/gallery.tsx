"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion"
import { Suspense, useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EmptyImageIcon } from "@/components/icons";

const carouselImages = [
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
  "/gallery/placeholder.webp",
];

const albumImages = {
  year_2025: {
    name: "2025",
    images: [
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
    ],
  },
  year_2024: {
    name: "2024",
    images: [
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
    ],
  },
  year_2023: {
    name: "2023",
    images: [
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
    ],
  },
  year_2022: {
    name: "2022",
    images: [
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
      "/gallery/placeholder.webp",
    ],
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
}

const carouselVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: 0.2,
    },
  },
}

const selectVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: 0.3,
    },
  },
}

const gridVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
}

const itemVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

const emptyStateVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
}

export default function Gallery() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))
  const [selectedAlbum, setSelectedAlbum] = useState<string>("")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [carouselApi, setCarouselApi] = React.useState<any>()
  const [containerHeight, setContainerHeight] = useState<number>(0)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Calculate container height based on current album
  useEffect(() => {
    if (containerRef.current && selectedAlbum) {
      const currentAlbum = albumImages[selectedAlbum as keyof typeof albumImages]
      if (currentAlbum) {
        // Calculate approximate height based on grid layout
        const imageCount = currentAlbum.images.length
        const cols = {
          base: 1,
          xs: 2,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
        }

        const rows = Math.ceil(imageCount / 4)
        const itemHeight = 200 // Approximate height of each grid item
        const gap = 4 // Gap between items
        const calculatedHeight = rows * itemHeight + (rows - 1) * gap

        setContainerHeight(Math.max(calculatedHeight, 400))
      }
    } else {
      setContainerHeight(400)
    }
  }, [selectedAlbum])

  // Handle album change with smooth transition
  const handleAlbumChange = async (newAlbum: string) => {
    if (newAlbum === selectedAlbum) return

    setIsTransitioning(true)

    // Small delay to allow exit animation to start
    await new Promise((resolve) => setTimeout(resolve, 100))

    setSelectedAlbum(newAlbum)

    // Allow time for content to load and animate in
    await new Promise((resolve) => setTimeout(resolve, 300))

    setIsTransitioning(false)
  }

  // Get current album data
  const currentAlbum = selectedAlbum ? albumImages[selectedAlbum as keyof typeof albumImages] : null
  const currentImages = currentAlbum?.images || []

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <motion.main
        className="container mx-auto py-6 sm:py-12 px-4 sm:px-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <div className="text-center sm:text-left mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Gallery</h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">Explore our collection of images.</p>
        </div>

        {/* Featured Images Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">Featured Images</h2>
          <motion.div className="max-w-full sm:max-w-2xl mx-auto touch-pan-x" variants={carouselVariants}>
            <div className="relative">
              <Carousel
                plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
                className="mb-2"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                setApi={setCarouselApi}
                opts={{
                  align: "start",
                  loop: true,
                  dragFree: false,
                  containScroll: "trimSnaps",
                }}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {carouselImages.map((src, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-full">
                      <div className="relative">
                        <img
                          src={src}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-48 sm:h-64 md:h-auto object-cover rounded-lg shadow-lg"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Desktop Navigation */}
                <CarouselPrevious className="hidden sm:flex -left-12" />
                <CarouselNext className="hidden sm:flex -right-12" />
              </Carousel>

              {/* Mobile Navigation Controls */}
              <div className="flex sm:hidden justify-center items-center gap-4 mt-4 mb-2">
                <button
                  onClick={() => carouselApi?.scrollPrev()}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex items-center text-xs text-gray-500 px-3">
                  <span>Swipe or tap</span>
                </div>

                <button
                  onClick={() => carouselApi?.scrollNext()}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Albums Section */}
        <div className="space-y-6">
          {/* Albums Header and Select */}
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Albums</h1>
            <motion.div className="w-full sm:w-auto sm:min-w-[280px] sm:max-w-[320px]" variants={selectVariants}>
              <Select value={selectedAlbum} onValueChange={handleAlbumChange}>
                <SelectTrigger
                  className="w-full h-12 text-base sm:text-sm bg-white border-2 hover:border-gray-400 focus:border-blue-500 transition-colors"
                  disabled={isTransitioning}
                >
                  <SelectValue placeholder="Select an album" />
                </SelectTrigger>
                <SelectContent
                  className="w-full max-w-[calc(100vw-2rem)] sm:max-w-[320px]"
                  position="popper"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  {Object.entries(albumImages).map(([key, album]) => (
                    <SelectItem
                      key={key}
                      value={key}
                      className="text-base sm:text-sm py-3 sm:py-2 cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-medium">{album.name}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full ml-2">{album.images.length}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </div>

          {/* Images Grid Container*/}
          <div
            ref={containerRef}
            className="relative transition-all duration-500 ease-out"
            style={{ height: `${containerHeight}px` }}
          >
            <AnimatePresence mode="wait">
              {selectedAlbum && currentImages.length > 0 && (
                <motion.div
                  key={selectedAlbum}
                  className="absolute grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 content-start"
                  variants={gridVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {currentImages.map((src, index) => (
                    <motion.div
                      key={`${selectedAlbum}-${index}`}
                      className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                      variants={itemVariants}
                    >
                      <img
                        src={src}
                        alt={currentAlbum ? `${currentAlbum.name} image ${index + 1}` : `Album image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedAlbum === "" && (
                <motion.div
                  key="empty"
                  className="absolute inset-0 flex items-center justify-center"
                  variants={emptyStateVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <EmptyImageIcon />
                    </div>
                    <p className="text-gray-500 text-base sm:text-lg font-medium mb-2">No album selected</p>
                    <p className="text-gray-400 text-sm sm:text-base">Please select an album above to view images</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.main>
    </Suspense>
  )
}