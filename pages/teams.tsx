"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import Sponsors from "@/components/sponsor"
import React from 'react';

export default function Teams() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide">
            Our Robotics Teams
          </h1>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {siteConfig.stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="text-center p-6 bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="space-y-3">
                <div className={`w-12 h-12 mx-auto rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-[#1a1a1f]">
                  <AnimatedCounter end={stat.value} duration={1500 + index * 200} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#1a1a1f] text-center">Our Initiative</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Since 2019, Coast 2 Coast Robotics teams have competed at regionals, state championships, and
                international/Worlds competitions in VEX IQ Robotics, VEX Robotics, and various coding competitions.
              </p>
              <p>
                We believe in developing skilled engineers, who embody the values of teamwork, creativity, and technical
                prowess.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to inspire students to pursue STEM careers through hands-on robotics experience,
                competitive programming, and collaborative engineering challenges.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href={siteConfig.siteURLs.history}>
            <Button size="lg" className="bg-[#1a1a1f] hover:bg-gray-800 text-white font-bold px-8 py-4">
              View Team History
            </Button>
          </Link>
        </motion.div>

        {/* Sponsors Section */}
        <Sponsors/>
      </div>
    </div>
  )
}