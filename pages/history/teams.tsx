"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, MapPin, Menu, X, Camera, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// will start siteconfig implementation soon
// placeholder data
const teamsData = {
  2024: [
    {
      id: 1,
      name: "team1",
      achievements: [
        { name: "Regional Championship", place: "1st", date: "March 2024", location: "" },
        { name: "State Tournament", place: "2nd", date: "April 2024", location: "" },
        { name: "National Qualifiers", place: "3rd", date: "May 2024", location: "" },
      ],
      competitions: [
        { name: "Regional Championship", date: "March 10-15, 2024", location: "" },
        { name: "State Tournament", date: "April 18-22, 2024", location: "" },
        { name: "National Qualifiers", date: "May 5-8, 2024", location: "" },
      ],
      photos: [
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "Team Photo 2024" },
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "Regional Championship Victory" },
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "State Tournament Action" },
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "" },
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "" },
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "" },
      ],
    },
    {
      id: 2,
      name: "team2",
      achievements: [
        { name: "City Championship", place: "1st", date: "February 2024", location: "" },
        { name: "Inter-School Tournament", place: "1st", date: "March 2024", location: "" },
        { name: "Summer Cup", place: "2nd", date: "July 2024", location: "" },
      ],
      competitions: [
        { name: "City Championship", date: "February 25-28, 2024", location: "City Hall Arena" },
        { name: "Inter-School Tournament", date: "March 25-30, 2024", location: "University Stadium" },
        { name: "Summer Cup", date: "July 15-18, 2024", location: "Beachside Recreation Center" },
      ],
      photos: [
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "Lightning Bolts Team 2024" },
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "City Championship Win" },
      ],
    },
  ],
  2023: [
    {
      id: 4,
      name: "team1",
      achievements: [
        { name: "National Championship", place: "1st", date: "November 2023", location: "Washington DC" },
      ],
      competitions: [
        { name: "National Championship", date: "November 8-12, 2023", location: "Washington DC Arena" },
        { name: "Regional Finals", date: "October 5-8, 2023", location: "Central Valley Sports Hub" },
      ],
      photos: [
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "Fire Dragons 2023" },
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "National Champions" },
      ],
    },
  ],
}

const placeColors = {
  "1st": "bg-[#d4af37] text-white font-bold",
  "2nd": "bg-[#c0c0c0] text-white font-bold",
  "3rd": "bg-[#cd7f32] text-white font-bold",
  "Xth": "bg-[#D9D9D9] text-white font=bold",
}

const scrollVariants = {
  left: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  },
  right: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  },
  up: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  },
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const sidebarVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

const mobileSidebarVariants = {
  hidden: {
    x: "-100%",
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
  visible: {
    x: 0,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
}

export default function Teams() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const years = Object.keys(teamsData)
    .map(Number)
    .sort((a, b) => b - a)

  const currentTeams = teamsData[selectedYear as keyof typeof teamsData] || []
  const displayTeam = selectedTeam ? currentTeams.find((t) => t.id === selectedTeam) : currentTeams[0]

  const contentKey = `${selectedYear}-${selectedTeam || displayTeam?.id || "none"}`

  const handleYearSelect = (year: number) => {
    setSelectedYear(year)
    setSelectedTeam(null)
    setSidebarOpen(false)
  }

  const handleTeamSelect = (teamId: number) => {
    setSelectedTeam(teamId)
    setSidebarOpen(false)
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile Header */}
      <motion.div
        className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4 relative z-30"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/history"
              className="mr-2 inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xl font-bold text-[#1a1a1f] uppercase tracking-wide">Team History</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="relative z-50">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </motion.div>

      <div className="flex relative">
        {/* Desktop Sidebar */}
        <motion.div
          className="hidden lg:block w-64 bg-white shadow-lg border-r border-gray-200"
          initial={{ x: -256 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="p-6 border-b border-gray-200">
            <Link
              href="/history"
              className="mb-4 w-full justify-start inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Overview
            </Link>
            <h1 className="text-xl font-bold text-[#1a1a1f] uppercase tracking-wide">Team History</h1>
          </div>

          <div className="p-6 overflow-y-auto h-[calc(100vh-120px)]">
            {/* Year Selection */}
            <div className="mb-8">
              <h3 className="font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide">Select Year</h3>
              <motion.div className="space-y-2" variants={sidebarVariants} initial="hidden" animate="visible">
                {years.map((year) => (
                  <motion.button
                    key={year}
                    variants={itemVariants}
                    onClick={() => handleYearSelect(year)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ease-out font-bold uppercase tracking-wide hover:scale-[1.02] ${
                      selectedYear === year
                        ? "bg-[#1a1a1f] text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100 hover:shadow-md"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {year}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Team Selection */}
            {currentTeams.length > 0 && (
              <div>
                <h3 className="font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide">Teams</h3>
                <motion.div className="space-y-2" variants={sidebarVariants} initial="hidden" animate="visible">
                  {currentTeams.map((team) => (
                    <motion.button
                      key={team.id}
                      variants={itemVariants}
                      onClick={() => handleTeamSelect(team.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-300 ease-out font-bold uppercase tracking-wide hover:scale-[1.02] ${
                        selectedTeam === team.id || (!selectedTeam && team === currentTeams[0])
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-50 hover:shadow-md"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {team.name}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Mobile Sidebar */}
              <motion.div
                className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 lg:hidden"
                variants={mobileSidebarVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold text-[#1a1a1f] uppercase tracking-wide">Team History</h1>
                  </div>
                  <Link
                    href="/history"
                    className="w-full justify-start inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Overview
                  </Link>
                </div>

                <div className="p-6 overflow-y-auto h-[calc(100vh-140px)]">
                  {/* Year Selection */}
                  <div className="mb-8">
                    <h3 className="font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide">Select Year</h3>
                    <div className="space-y-2">
                      {years.map((year) => (
                        <button
                          key={year}
                          onClick={() => handleYearSelect(year)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ease-out font-bold uppercase tracking-wide ${
                            selectedYear === year
                              ? "bg-[#1a1a1f] text-white shadow-lg"
                              : "text-gray-700 hover:bg-gray-100 hover:shadow-md"
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Team Selection */}
                  {currentTeams.length > 0 && (
                    <div>
                      <h3 className="font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide">Teams</h3>
                      <div className="space-y-2">
                        {currentTeams.map((team) => (
                          <button
                            key={team.id}
                            onClick={() => handleTeamSelect(team.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-300 ease-out font-bold uppercase tracking-wide ${
                              selectedTeam === team.id || (!selectedTeam && team === currentTeams[0])
                                ? "bg-blue-600 text-white shadow-lg"
                                : "text-gray-600 hover:bg-gray-50 hover:shadow-md"
                            }`}
                          >
                            {team.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <div className="p-6 lg:p-8">
            {displayTeam ? (
              <div className="space-y-8">
                {/* Team Header */}
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader className="bg-[#1a1a1f] text-white rounded-t-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <CardTitle className="text-3xl mb-2 sm:mb-0 uppercase tracking-wide font-bold">
                          {displayTeam.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                          <Trophy className="w-5 h-5" />
                          <span className="text-lg font-bold">{displayTeam.achievements.length} Awards</span>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>

                {/* Achievements */}
                <motion.div
                  variants={scrollVariants.left}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-[#1a1a1f] flex items-center uppercase tracking-wide">
                        <Trophy className="w-6 h-6 mr-3 text-yellow-500" />
                        Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <motion.div
                        key={`achievements-${contentKey}`}
                        className="grid gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {displayTeam.achievements.map((achievement, index) => (
                          <motion.div
                            key={index}
                            variants={contentVariants}
                            className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                            whileHover={{ scale: 1.02, y: -2 }}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex-1 mb-3 sm:mb-0">
                                <h4 className="font-bold text-lg text-[#1a1a1f] mb-2 uppercase tracking-wide">
                                  {achievement.name}
                                </h4>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-600">
                                  <div className="flex items-center mb-1 sm:mb-0 font-medium">
                                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                    <span>{achievement.date}</span>
                                  </div>
                                  <div className="flex items-center font-medium">
                                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                                    <span>{achievement.location}</span>
                                  </div>
                                </div>
                              </div>
                              <Badge
                                className={`${placeColors[achievement.place as keyof typeof placeColors]} px-4 py-2 text-lg transition-all duration-300`}
                                variant="outline"
                              >
                                {achievement.place}
                              </Badge>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Competitions */}
                <motion.div
                  variants={scrollVariants.right}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-[#1a1a1f] flex items-center uppercase tracking-wide">
                        <Calendar className="w-6 h-6 mr-3 text-blue-500" />
                        Competitions Participated
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <motion.div
                        key={`competitions-${contentKey}`}
                        className="grid gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {displayTeam.competitions.map((competition, index) => (
                          <motion.div
                            key={index}
                            variants={contentVariants}
                            className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                            whileHover={{ scale: 1.02, y: -2 }}
                          >
                            <h4 className="font-bold text-lg text-[#1a1a1f] mb-3 uppercase tracking-wide">
                              {competition.name}
                            </h4>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-600">
                              <div className="flex items-center mb-1 sm:mb-0 font-medium">
                                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                <span>{competition.date}</span>
                              </div>
                              <div className="flex items-center font-medium">
                                <MapPin className="w-4 h-4 mr-2 text-red-500" />
                                <span>{competition.location}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Photos */}
                <motion.div
                  variants={scrollVariants.up}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-[#1a1a1f] flex items-center uppercase tracking-wide">
                        <Camera className="w-6 h-6 mr-3 text-purple-500" />
                        Photo Gallery
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <motion.div
                        key={`photos-${contentKey}`}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {displayTeam.photos.map((photo, index) => (
                          <motion.div
                            key={index}
                            variants={contentVariants}
                            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500"
                            whileHover={{ scale: 1.05, y: -5 }}
                          >
                            <img
                              src={photo.url || "/placeholder.svg"}
                              alt={photo.caption}
                              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <p className="font-medium text-sm uppercase tracking-wide">{photo.caption}</p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white shadow-lg border-0">
                  <CardContent className="text-center py-16">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <Trophy className="w-16 h-16 mx-auto text-gray-400 mb-6" />
                    </motion.div>
                    <motion.h3
                      className="text-2xl font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      No Team Selected
                    </motion.h3>
                    <motion.p
                      className="text-gray-600 text-lg"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Select a year and team to view their history.
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
