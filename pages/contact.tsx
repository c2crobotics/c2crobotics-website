"use client"

import { motion } from "framer-motion"
import ContactForm from "@/components/contact-form"
import ContactInfo from "@/components/contact-info"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import React from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

const formVariants = {
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

const infoVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.4,
    },
  },
}

export default function Contact() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <motion.main
        className="container mx-auto py-12 px-4 md:px-6 bg-gray-50 max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div className="space-y-2 text-center mb-8" variants={headerVariants}>
            <motion.h1 className="text-3xl font-bold tracking-tighter sm:text-4xl" variants={itemVariants}>
              Contact Us
            </motion.h1>
            <motion.p className="text-gray-500 dark:text-gray-400" variants={itemVariants}>
              We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </motion.p>
          </motion.div>

          <motion.div variants={formVariants}>
            <ContactForm />
          </motion.div>

          <Toaster />
        </div>

        <motion.div variants={infoVariants}>
          <ContactInfo />
        </motion.div>
      </motion.main>
    </Suspense>
  )
}