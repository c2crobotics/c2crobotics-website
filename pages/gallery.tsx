"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Suspense, useState, useEffect, useCallback } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmptyImageIcon } from "@/components/icons"
import { siteConfig } from "@/config/site"
import type { JSX } from "react"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
}

const carouselVariants: Variants = {
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

const selectVariants: Variants = {
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

const gridVariants: Variants = {
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

const itemVariants: Variants = {
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

const emptyStateVariants: Variants = {
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

const useWindowSizeHook = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}

export default function Gallery() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))
  const [selectedAlbum, setSelectedAlbum] = useState<string>("")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [carouselApi, setCarouselApi] = React.useState<any>()
  const [gridHeight, setGridHeight] = useState<number>(0)
  const gridRef = React.useRef<HTMLDivElement>(null)
  const windowSize = useWindowSizeHook()

  const { carouselImages, albums } = siteConfig.gallery

  const getGridColumns = useCallback(() => {
    const width = windowSize.width
    if (width < 640) return 1 // xs
    if (width < 768) return 2 // sm
    if (width < 1024) return 3 // md
    if (width < 1280) return 4 // lg
    return 5 // xl
  }, [windowSize.width])

  // Calculate container height based on current album
  useEffect(() => {
    if (!selectedAlbum) {
      setGridHeight(400)
      return
    }

    const [albumKey, subcategoryKey] = selectedAlbum.split(".")
    const album = albums[albumKey]

    let imageCount = 0
    if (subcategoryKey && album.subcategories?.[subcategoryKey]) {
      imageCount = album.subcategories[subcategoryKey].images.length
    } else {
      if (album.subcategories) {
        Object.values(album.subcategories).forEach((subcategory) => {
          imageCount += subcategory.images.length
        })
      }
    }

    const columns = getGridColumns()
    const rows = Math.ceil(imageCount / columns)

    // Calculate item size based on available width
    const containerWidth = gridRef.current?.clientWidth || windowSize.width
    const itemWidth = (containerWidth - (columns - 1) * 16) / columns
    const itemHeight = itemWidth
    const gap = 4
    const calculatedHeight = rows * itemHeight + (rows - 1) * gap

    setGridHeight(Math.max(calculatedHeight, 400))
  }, [selectedAlbum, albums, windowSize, getGridColumns])

  // Handle album change with smooth transition
  const handleAlbumChange = async (newAlbum: string) => {
    if (newAlbum === selectedAlbum) return
    setIsTransitioning(true)
    setSelectedAlbum(newAlbum)
    setIsTransitioning(false)
  }

  const getCurrentAlbumData = () => {
    if (!selectedAlbum) return null
    const [albumKey, subcategoryKey] = selectedAlbum.split(".")
    const album = albums[albumKey]
    if (!album) return null

    if (subcategoryKey && album.subcategories?.[subcategoryKey]) {
      return {
        name: `${album.name} - ${album.subcategories[subcategoryKey].name}`,
        images: album.subcategories[subcategoryKey].images,
      }
    }

    // If main album selected, combine all subcategory images
    if (album.subcategories) {
      const allImages: string[] = []
      Object.values(album.subcategories).forEach((subcategory) => {
        allImages.push(...subcategory.images)
      })
      return {
        name: album.name,
        images: allImages,
      }
    }

    return {
      name: album.name,
    }
  }
  const currentAlbum = getCurrentAlbumData()
  const currentImages = currentAlbum?.images || []

  // Generate dropdown options with subcategories
  const generateDropdownOptions = () => {
    const options: JSX.Element[] = []

    // Helper function to calculate total images in an album (only subcategories now)
    const getTotalImageCount = (album: any) => {
      if (album.subcategories) {
        let total = 0
        Object.values(album.subcategories).forEach((subcategory: any) => {
          total += subcategory.images.length
        })
        return total
      }
      return 0
    }

    Object.entries(albums).forEach(([albumKey, album]) => {
      const totalImages = getTotalImageCount(album)

      // Only show main album option if it has subcategories
      if (album.subcategories && Object.keys(album.subcategories).length > 0) {
        options.push(
          <SelectItem
            key={albumKey}
            value={albumKey}
            className="text-base sm:text-sm py-3 sm:py-2 cursor-pointer hover:bg-gray-50 font-semibold"
          >
            <div className="flex justify-between items-center w-full">
              <span className="font-semibold">{album.name}</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2">{totalImages}</span>
            </div>
          </SelectItem>,
        )

        // Add subcategory options
        Object.entries(album.subcategories).forEach(([subKey, subcategory]) => {
          options.push(
            <SelectItem
              key={`${albumKey}.${subKey}`}
              value={`${albumKey}.${subKey}`}
              className="text-base sm:text-sm py-2 sm:py-1 cursor-pointer hover:bg-gray-50 pl-6"
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-gray-600">{subcategory.name}</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full ml-2">{subcategory.images.length}</span>
              </div>
            </SelectItem>,
          )
        })
      }
    })

    return options
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <motion.div
          className="bg-[#1a1a1f] text-white py-6 "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <motion.h1
              className="text-2xl font-bold text-center mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Gallery
            </motion.h1>
            <motion.p
              className="text-sm text-center opacity-90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Explore our collection of images
            </motion.p>
          </div>
        </motion.div>

        {/* Content container */}
        <motion.main
          className="container mx-auto py-6 sm:py-12 px-4 sm:px-6 max-w-7xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
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
                            src={src || "/placeholder.svg"}
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
          <div className="space-y-6 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            {/* Albums Header and Select */}
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">Albums</h1>
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
                    {generateDropdownOptions()}
                  </SelectContent>
                </Select>
              </motion.div>
            </div>

            {/* Images Grid Container*/}
            <div
              ref={gridRef}
              className="relative w-full mb-8"
              style={{ minHeight: selectedAlbum ? `${gridHeight}px` : "400px" }}
            >
              <AnimatePresence mode="wait">
                {selectedAlbum && currentImages.length > 0 && (
                  <motion.div
                    key={selectedAlbum}
                    className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 w-full"
                    variants={gridVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {currentImages.map((src, index) => (
                      <motion.div
                        key={`${selectedAlbum}-${index}`}
                        className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-square"
                        variants={itemVariants}
                      >
                        <img
                          src={src || "/placeholder.svg"}
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
                    className="flex items-center justify-center h-[400px]"
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
      </div>
    </Suspense>
  )
}
