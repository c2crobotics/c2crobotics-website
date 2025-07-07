"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion"
import { Suspense, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
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

// Animations
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
    hidden: { opacity: 0, scale: 0.95},
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
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
            staggerChildren: 0.05,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
}

const LazyImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-auto object-cover transition-all duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } hover:scale-110`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  )
}

export default function Gallery() {
    const plugin = React.useRef(Autoplay({delay: 2000, stopOnInteraction: true}));
    const [selectedAlbum, setSelectedAlbum] = useState<string>("");
    const [carouselApi, setCarouselApi] = React.useState<any>()

    const currentAlbum = selectedAlbum ? albumImages[selectedAlbum as keyof typeof albumImages] : null
    const currentImages = currentAlbum?.images || []

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <motion.main
                className="container mx-auto py-12 px-4 md:px-6"
                initial="hidden"
                animate="visible"
                variants={ containerVariants }
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
                                        loading="lazy"
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
                    <h1 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">Albums</h1>
                    <motion.div className="w-full sm:w-auto sm:min-w-[280px]" variants={selectVariants}>
                    <Select value={selectedAlbum} onValueChange={setSelectedAlbum}>
                        <SelectTrigger className="w-full h-12 text-base sm:text-sm bg-white border-2 hover:border-gray-400 focus:border-blue-500 transition-colors">
                        <SelectValue placeholder="Select an album" />
                        </SelectTrigger>
                        <SelectContent className="w-full min-w-[280px]">
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

                {/* Images Grid */}
                {selectedAlbum && currentImages.length > 0 && (
                    <motion.div
                    className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6"
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                    key={selectedAlbum}
                    >
                    {currentImages.map((src, index) => (
                        <motion.div
                        key={`${selectedAlbum}-${index}`}
                        className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        variants={itemVariants}
                        >
                        <LazyImage
                            src={src}
                            alt={currentAlbum ? `${currentAlbum.name} image ${index + 1}` : `Album image ${index + 1}`}
                            className="w-full h-full"
                        />
                        </motion.div>
                    ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {selectedAlbum === "" && (
                    <motion.div
                    className="text-center py-12 sm:py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    >
                    <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <EmptyImageIcon/>
                        </div>
                        <p className="text-gray-500 text-base sm:text-lg font-medium mb-2">No album selected</p>
                        <p className="text-gray-400 text-sm sm:text-base">Please select an album above to view images</p>
                    </div>
                    </motion.div>
                )}
                </div>

            </motion.main>
        </Suspense>
    )
}
