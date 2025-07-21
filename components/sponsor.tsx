import { motion } from "framer-motion"
import { Card, CardContent, } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import React from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function Sponsors() {
  return (
    <motion.div
      className="bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <h1 className="text-4xl font-bold text-[#1a1a1f] mb-6 text-center">Our Partners & Sponsors</h1>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {siteConfig.sponsors.map((sponsor, index) => (
          <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="group">
            <Card className="p-4 border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
              <CardContent className="text-center space-y-3">
                <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="block">
                  <img
                    src={sponsor.link}
                    alt={sponsor.title}
                    className="w-full h-12 object-contain mx-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <p className="font-bold text-sm text-[#1a1a1f] mt-2">{sponsor.title}</p>
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}