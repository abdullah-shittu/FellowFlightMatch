'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ProfileCard } from '@/components/ProfileCard'
import useAuthGuard from '@/components/TokGuard'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home () {
  useAuthGuard()
  const [matches, setMatches] = useState([])
  // const router = useRouter()

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('fellowflight_access_token='))
      ?.split('=')[1]
    const flight_id = document.cookie
      .split('; ')
      .find(row => row.startsWith('fellowflight_id='))
      ?.split('=')[1]

    //Create function that fetches fligth matches
    const fetchFlightMatches = async () => {
      try {
        const response = await fetch(
          `https://api.fellowflightmatch.abdullah.buzz/api/v1/matches?flight_id=${Number(
            flight_id
          )}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
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
    const convertToMockMatches = matchResponse => {
      const mockMatches = []
      if (matchResponse.same_flight) {
        matchResponse.same_flight.forEach(profile => {
          mockMatches.push({
            user: {
              name: profile.name,
              subtitle: 'MLT Class of 2026', // Placeholder subtitle
              profileImage: 'https://randomuser.me/api/profile',
              linkedinUrl: profile.linkedin_url || '#'
            },
            matchType: 'Same Flight',
            isSameFlight: true,
            matchDetails: null // No specific overlap details needed for Same Flight
          })
        })
      }
      if (matchResponse.time_overlap) {
        matchResponse.time_overlap.forEach(profile => {
          mockMatches.push({
            user: {
              name: profile.name,
              subtitle: 'MLT CP Fellow 27', // Placeholder subtitle
              profileImage: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${Math.floor(
                Math.random() * 1000
              )}}`,
              linkedinUrl: profile.linkedin_url || '#'
            },
            matchType: 'Airport Overlap',
            isSameFlight: false,
            matchDetails: {
              overlapTime: profile.overlap_minutes
                ? `${profile.overlap_minutes}-minute overlap`
                : 'Unknown overlap time'
            }
          })
        })
      }
      return mockMatches
    }
    const fetchMatches = async () => {
      const matchResponse = await fetchFlightMatches()
      const mockMatches = convertToMockMatches(matchResponse)
      setMatches(mockMatches)
    }
    fetchMatches()
  }, [])
  //How to make it so the use
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
  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-3xl font-bold mb-8'>Your Flight Matches</h1>

      {matches.length === 0 ? (
        <div className='text-center'>
          <p className='text-lg text-gray-600 mb-4'>
            No matches found yet. Please check back later or we'll notify you on
            slack!
          </p>
        </div>
      ) : (
        <div className='flex flex-wrap gap-6 justify-start'>
          {matches.map((match, index) => (
            <ProfileCard
              key={index}
              user={match.user}
              matchType={match.matchType}
              matchDetails={match.matchDetails}
              isSameFlight={match.isSameFlight}
            />
          ))}
        </div>
      )}
    </div>
  )
}
