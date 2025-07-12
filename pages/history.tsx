"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { Trophy, Users, Calendar, Award } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"

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

const stats = [
  {
    icon: Trophy,
    label: "Awards Won",
    value: 0,
    suffix: "+",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Calendar,
    label: "Robotics Competitions",
    value: 0,
    suffix: "+",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    label: "VRC/VIQRC Teams",
    value: 6,
    suffix: "",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Award,
    label: "Years of Innovation",
    value: 6,
    suffix: "+",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
]

export default function History() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
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
          {stats.map((stat, index) => (
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
          <Link href="/history/teams">
            <Button size="lg" className="bg-[#1a1a1f] hover:bg-gray-800 text-white font-bold px-8 py-4">
              View Team History
            </Button>
          </Link>
        </motion.div>

        {/* Sponsors Section */}
        <motion.div
          className="pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-lg font-bold text-[#1a1a1f] mb-6 text-center">Our Proud Sponsors</h3>
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
      </div>
    </div>
  )
}