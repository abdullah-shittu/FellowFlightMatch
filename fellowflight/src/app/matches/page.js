'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ProfileCard } from '@/components/ProfileCard'
import useAuthGuard from '@/components/TokGuard'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home () {
  useAuthGuard()
  const router = useRouter()
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('fellowflight_access_token='))
    ?.split('=')[1]
  setStyle({
    width: isMobile ? '90vw' : '100%',
    maxWidth: '1000px',
    height: isMobile ? '80vh' : '70vh',
    margin: '0 auto'
  })

  const flightid = 0
  //Create function that fetches fligth matches
  const fetchFlightMatches = async () => {
    try {
      const response = await fetch(`https://api.fellowflightmatch.abdullah.buzz/api/v1/matches?flight_id=${flightid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching flight matches:', error)
      return []
    }
  } 

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('jwt')
    if (!isAuthenticated) {
      auth_url = 'slack_url'
      router.push(auth_url) // redirect client-side
    }
  }, [])

  // A single object representing an Airport Overlap match
  const mockMatches = [
    {
      user: {
        name: 'Jane Smith',
        subtitle: 'MLT Class of 2026',
        profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/janesmith'
      },
      matchType: 'Same Flight',
      isSameFlight: true,
      matchDetails: null // No specific overlap details needed for Same Flight
    },
    {
      user: {
        name: 'Michael Chen',
        subtitle: 'MLT Class of 2025',
        profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/michaelchen'
      },
      matchType: 'Airport Overlap',
      isSameFlight: false,
      matchDetails: {
        overlapTime: '60-minute overlap'
      }
    },
    {
      user: {
        name: 'Sarah Miller',
        subtitle: 'MLT Class of 2026',
        profileImage: 'https://randomuser.me/api/portraits/women/4.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/sarahmiller'
      },
      matchType: 'Airport Overlap',
      isSameFlight: false,
      matchDetails: {
        overlapTime: '25-minute overlap'
      }
    }
  ]
  // On load, it will call hte get api.
  //   GET /matches
  // Flow: Match Finder
  // Description: Finds and returns all matching users for a specific flight submitted by the authenticated user.
  // Authentication: Required.
  // Query Parameters:
  // flight_id (string, required): The ID of the user's flight for which to find matches.
  // Responses:
  // 200 OK: Returns a list of matched users, categorized by match type.
  // JSON
  // {
  //   "same_flight": [
  //     {
  //       "name": "John Smith",
  //       "linkedin_url": "https://linkedin.com/in/johnsmith",
  //       "slack_id": "U98765ZYX"
  //     }
  //   ],
  //   "time_overlap": [
  //     {
  //       "name": "Emily White",
  //       "linkedin_url": "https://linkedin.com/in/emilywhite",
  //       "slack_id": "U54321BCA"
  //     }
  //   ]
  // }

  // 400 Bad Request: If the flight_id query parameter is missing.
  // 403 Forbidden: If the user requests matches for a flight_id they do not own.
  // 404 Not Found: If the specified flight_id does not exist.
  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-3xl font-bold mb-8'>Your Flight Matches</h1>

      <div className='flex flex-wrap gap-6 justify-start'>
        {mockMatches.map((match, index) => (
          <ProfileCard
            key={index}
            user={match.user}
            matchType={match.matchType}
            matchDetails={match.matchDetails}
            isSameFlight={match.isSameFlight}
          />
        ))}
      </div>
    </div>
  )
}
