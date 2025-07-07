"use client";

import { motion } from "framer-motion";

const images = [
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

const itemVariants = { 
    
}

export default function Gallery() {
    return (
        <motion.main
            className="container mx-auto py-12 px-4 md:px-6"
            initial="hidden"
            animate="visible"
            variants={ containerVariants }
        >
            <h1 className="text-3xl font-bold mb-6">Gallery</h1>
            <p className="text-lg text-gray-700 mb-8">
                Explore our collection of images.
            </p>
            {/* Gallery content goes here */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((src, index) => (
                    <motion.div
                        key={index}
                        className="overflow-hidden rounded-lg shadow-lg"
                        variants={itemVariants}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-auto object-cover" />
                    </motion.div>
                ))}
            </div>


        </motion.main>
    )
}