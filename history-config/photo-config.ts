// Photo Configuration
// Add your photos here in the format:
// Year: { "Team Name": { "photo_url": "caption", "photo_url2": "caption2" } }

export const PHOTOS: Record<number, Record<string, Record<string, string>>> = {
  2025: {

  },
  2024: {
    "C’Mon Man!": {
      "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_4967].webp": "Signature Event 2024",
      "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5185].webp": "Signature Event 2024",
      "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5237].webp": "Team 62880C Robot",
      "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5313].webp": "Signature Event 2024",
      "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5292].webp": "Signature Event 2024",
      "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5303].webp": "Signature Event 2024",
      "/gallery/NJIT2024/NJIT2024_September22_JHO [IMG_5861].webp": "Signature Event 2024",
      "/gallery/NJIT2024/NJIT2024_September22_JHO [IMG_5677].webp": "Team 62880C Robot",
      "/gallery/NJIT2024/NJIT2024_September22_JHO [IMG_6109].webp": "Signature Event 2024",
      "/gallery/NJIT2024/NJIT2024_September22_JHO [IMG_5492].webp": "Signature Event 2024",
      "/gallery/NJIT2024/NJIT2024_September22_JHO [IMG_6136].webp": "Team 62880C Robots",
      "/gallery/NJIT2024/NJIT2024_September22_JHO [IMG_6020].webp": "Signature Event 2024",
    },
    "Square Shaped Potatoes": {
      "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2304].webp": "Worlds Competition 2024",
      "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2320].webp": "Worlds Competition 2024",
      "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2327].webp": "Team 65950A Robot",
      "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2587].webp": "Worlds Competition 2024 Team Photo",
      "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2486].webp": "Worlds Competition 2024",
      "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2618].webp": "Worlds Competition 2024",
      "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2441].webp": "Worlds Competition 2024",
      "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2427].webp": "Worlds Competition 2024",
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