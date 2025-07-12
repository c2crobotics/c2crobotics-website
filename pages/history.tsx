"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, MapPin, Menu, X, Camera, ArrowLeft } from "lucide-react"
import Link from "next/link"
import motion from "framer-motion"

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
}

export default function HistoryPage() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const years = Object.keys(teamsData).map(Number).sort((a, b) => b - a)

  const currentTeams = teamsData[selectedYear as keyof typeof teamsData] || []
  const displayTeam = selectedTeam ? currentTeams.find((t) => t.id === selectedTeam) : currentTeams[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="mr-2 inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xl font-bold text-[#1a1a1f] uppercase tracking-wide">Team History</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out lg:transition-none`}
        >
          <div className="p-6 border-b border-gray-200 hidden lg:block">
            <Link
              href="/"
              className="mb-4 w-full justify-start inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Overview
            </Link>
            <h1 className="text-xl font-bold text-[#1a1a1f] uppercase tracking-wide">Team History</h1>
          </div>

          <div className="p-6 overflow-y-auto h-full">
            {/* Year Selection */}
            <div className="mb-8">
              <h3 className="font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide">Select Year</h3>
              <div className="space-y-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year)
                      setSelectedTeam(null)
                      setSidebarOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-bold uppercase tracking-wide ${
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
                      onClick={() => {
                        setSelectedTeam(team.id)
                        setSidebarOpen(false)
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 font-bold uppercase tracking-wide ${
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
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6 lg:p-8">
            {displayTeam ? (
              <div className="space-y-8">
                {/* Team Header */}
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

                {/* Achievements */}
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-[#1a1a1f] flex items-center uppercase tracking-wide">
                      <Trophy className="w-6 h-6 mr-3 text-yellow-500" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {displayTeam.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
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
                              className={`${placeColors[achievement.place as keyof typeof placeColors]} px-4 py-2 text-lg`}
                            >
                              {achievement.place}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Competitions */}
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-[#1a1a1f] flex items-center uppercase tracking-wide">
                      <Calendar className="w-6 h-6 mr-3 text-blue-500" />
                      Competitions Participated
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {displayTeam.competitions.map((competition, index) => (
                        <div
                          key={index}
                          className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
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
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Photos */}
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-[#1a1a1f] flex items-center uppercase tracking-wide">
                      <Camera className="w-6 h-6 mr-3 text-purple-500" />
                      Photo Gallery
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {displayTeam.photos.map((photo, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                        >
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3">
                            <p className="font-medium text-sm uppercase tracking-wide">{photo.caption}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="text-center py-16">
                  <Trophy className="w-16 h-16 mx-auto text-gray-400 mb-6" />
                  <h3 className="text-2xl font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide">No Team Selected</h3>
                  <p className="text-gray-600 text-lg">Select a year and team to view their history.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
