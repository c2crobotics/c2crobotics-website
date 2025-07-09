"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const teamsData = {
    2024: [
        {
            id: 1,
            name: "team1",
        },
        {
            id: 2,
            name: "team2",
        },
        {
            id: 3,
            name: "team3",
        },
    ],
    2023: [
        {
            id: 4,
            name: "team1",
        },
        {
            id: 5,
            name: "team2",
        },
    ],
}


export default function History() {
    const [selectedYear, setSelectedYear] = useState(2024)
    const [selectedTeam, setSelectedTeam] = useState<number | null>(null)

    const years = Object.keys(teamsData).map(Number).sort((a, b) => b - a)
    const currentTeam = teamsData[selectedYear as keyof typeof teamsData] || []

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-6x1 mx-auto container ">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Team History</h1>
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                    {/* Year and Team Selection */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Select Year</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {years.map((year) => (
                                        <button
                                            key={year}
                                            onClick={() => {
                                                setSelectedYear(year)
                                                setSelectedTeam(null)
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded transition-colors ${selectedYear === year
                                                ? "bg-blue-100 text-blue-900 font-medium"
                                                : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>

                                {currentTeam.length > 0 && (
                                    <div className="mt-6">
                                        <h3 className="font-medium text-gray-900 mb-3">Teams</h3>
                                        <div className="space-y-2">
                                            {currentTeam.map((team) => (
                                                <button key={team.id}
                                                    onClick={() => setSelectedTeam(team.id)}
                                                    className={`w-full text-left px-3 py-2 rounded text-sm transition colors ${selectedTeam === team.id || (!selectedTeam && team === currentTeam[0])
                                                        ? "bg-green-100 text-green-900"
                                                        : "text-gray-600 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {team.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                    {/* Team Details, Awards, Competitions */}

                </div>
            </div>
        </div>
    )
}