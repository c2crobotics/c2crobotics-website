// Photo Configuration
// Add your photos here in the format:
// Year: { "Team Name": { "photo_url": "caption", "photo_url2": "caption2" } }

export const PHOTOS: Record<number, Record<string, Record<string, string>>> = {
  2025: {
    "Tidal": {
      "https://example.com/photo1.jpg": "Team at World Championships 2024",
      "https://example.com/photo2.jpg": "Robot Design Showcase",
      "https://example.com/photo3.jpg": "Award Ceremony",
    },
    "Burnt Potatoes": {
      "https://example.com/photo4.jpg": "Competition Day",
      "https://example.com/photo5.jpg": "Team Building Session",
    },
  },
  2024: {
    "Tidal": {
      "https://example.com/photo6.jpg": "Regional Competition 2023",
      "https://example.com/photo7.jpg": "Robot Testing",
    },
  },
  // Add more years and teams as needed
}

// Helper function to get photos for a team and year
export function getPhotos(teamName: string, year: number): Array<{ url: string; caption: string }> {
  const teamPhotos = PHOTOS[year]?.[teamName] || {}

  return Object.entries(teamPhotos).map(([url, caption]) => ({
    url,
    caption,
  }))
}