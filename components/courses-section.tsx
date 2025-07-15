"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, Cog, Trophy, Clock, Users, Star } from "lucide-react"

const courses = {
  learn: {
    icon: BarChart3,
    title: "Learn",
    description: "Master robotics fundamentals through hands-on experience and expert mentorship.",
    courses: [
      {
        title: "Robotics Foundations",
        description:
          "Build your first robot while learning core engineering principles, basic programming, and design thinking using the VEX IQ system.",
        duration: "8 weeks",
        level: "Beginner",
        features: ["VEX IQ Robotics Platform", "Block-based programming", "Team collaboration", "Problem-solving skills"],
      },
      {
        title: "Programming Foundations",
        description: "Dive deep .",
        duration: "12 weeks",
        level: "Intermediate",
        features: ["Programming logic", "Basic data types", "Advanced algorithms", "Competition strategies"],
      },
      {
        title: "Engineering Design Process",
        description: "Learn industry-standard design methodologies used by professional engineers and roboticists.",
        duration: "6 weeks",
        level: "All levels",
        features: ["CAD design", "Prototyping methods", "Testing protocols", "Documentation skills"],
      },
    ],
  },
  create: {
    icon: Cog,
    title: "Create",
    description: "Transform your ideas into reality through innovative design and manufacturing.",
    courses: [
      {
        title: "test",
        description: "test",
        duration: "10 weeks",
        level: "Intermediate",
        features: ["test"],
      },
      {
        title: "Manufacturing & Prototyping",
        description:
          "test",
        duration: "8 weeks",
        level: "Advanced",
        features: ["3D printing mastery", "CNC basics", "Quality control"],
      },
    ],
  },
  compete: {
    icon: Trophy,
    title: "Compete",
    description: "Test your skills against the best teams from around the world in prestigious competitions.",
    courses: [
      {
        title: "VEX Robotics Team",
        description:
          "Join our elite competition teams and compete in VEX Robotics tournaments at regional, state, and world levels.",
        duration: "Season-long",
        level: "Intermediate",
        features: ["Tournament preparation", "Strategy development", "Team leadership", "Award pursuit"],
      },
      {
        title: "VEXIQ Robotics Team",
        description: "Participate in the world's premier middle school robotics competition with industry mentors.",
        duration: "6 months",
        level: "Intermediate",
        features: ["Tournament preparation", "Strategy development", "Team leadership", "Award pursuit"],
      },
    ],
  },
}

const levelColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-blue-100 text-blue-800",
  Advanced: "bg-red-100 text-red-800",
  "All levels": "bg-gray-100 text-gray-800",
}

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState("learn")

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Learn, Create, Compete</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Get an immersive, practical experience - where students learn by doing. <br/> Using various design and development processes, develop and create your ideas. <br/> Show off your creations in competitions at the States and World Championships.
          </p>
        </motion.div>

        {/* Custom Tab Navigation */}
        <div className="mb-8">
          <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-6">
            {Object.entries(courses).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center justify-center gap-3 px-6 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === key
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 shadow-md"
                }`}
              >
                <section.icon className="w-5 h-5" />
                <div className="text-center">
                  <div className="font-semibold text-base">{section.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses[activeTab as keyof typeof courses].courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start gap-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900 flex-1 min-w-0">{course.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                      levelColors[course.level as keyof typeof levelColors]
                    }`}
                  >
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 text-base">{course.description}</p>
              </div>

              {/* Card Content */}
              <div className="px-6 pb-6 flex flex-col flex-grow">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                  <h4 className="font-semibold text-sm text-gray-900">Program highlights:</h4>
                  <ul className="space-y-1">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button pushed to bottom */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 mt-auto">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
