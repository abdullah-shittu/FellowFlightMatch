'use client'
import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuthGuard from '@/components/TokGuard'
import FuzzySearch from '@/components/Searcher'
// Helper component for creating icons with only divs and Tailwind CSS
const CssIcon = ({ type, className = '' }) => {
  if (type === 'plane') {
    return (
      <div className={`relative w-6 h-6 rotate-45 ${className}`}>
        <div className='absolute left-1/2 top-1/2 w-2 h-6 -translate-x-1/2 -translate-y-1/2 bg-current rounded-sm'></div>
        <div className='absolute left-1/2 top-1/2 w-6 h-2 -translate-x-1/2 -translate-y-1/2 bg-current rounded-sm'></div>
      </div>
    )
  }
  if (type === 'users') {
    return (
      <div className={`relative w-6 h-6 ${className}`}>
        <div className='absolute bottom-0 left-0 w-4 h-4 border-2 border-current rounded-full'></div>
        <div className='absolute top-0 right-0 w-4 h-4 bg-current rounded-full'></div>
      </div>
    )
  }
  if (type === 'notification') {
    return (
      <div className={`relative w-6 h-6 ${className}`}>
        <div className='w-full h-5 bg-current [clip-path:polygon(15%_0%,_85%_0%,_100%_100%,_0%_100%)]'></div>
        <div className='absolute -bottom-1 left-1/2 w-2 h-2 -translate-x-1/2 bg-current rounded-full'></div>
      </div>
    )
  }
  return null
}

// Main About Page Component
export default function AboutPage () {
  useAuthGuard();
  const router = useRouter()
  const redirect_link = 'https://api.fellowflightmatch.abdullah.buzz/api/v1/auth/slack'
  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem('jwt')
  //   if (isAuthenticated) {
  //     router.push('/dashboard') // redirect client-side
  //   }
  // }, [])
  // If authenticated, by checkign local session:
  // redirected me to another path
  //or display this html page?
  return (
    <div className='bg-gray-50 text-gray-800'>
      {/* Hero Section */}
      <main className='container mx-auto px-6 py-24 sm:py-32 text-center'>
        <div className='relative w-20 h-20 mx-auto mb-8'>
          {/* Arrival Pin Logo constructed with divs */}
          <div className='absolute bottom-0 left-1/2 w-12 h-12 bg-blue-600 rounded-full -translate-x-1/2'></div>
          <div className='absolute bottom-11 left-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-[16px] border-b-blue-600 -translate-x-1/2'></div>
          <div className='absolute bottom-3 left-1/2 -translate-x-1/2 text-white -rotate-45'>
            <div className='relative w-6 h-6'>
              <div className='absolute left-1/2 top-1/2 w-1.5 h-5 -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm'></div>
              <div className='absolute left-1/2 top-1/2 w-5 h-1.5 -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm'></div>
            </div>
          </div>
        </div>
        <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900'>
          Arrive Together
        </h1>
        <p className='mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600'>
          Discover other Summer Seminar fellows flying from the same airport and connect before takeoff.
        </p>
        <div className='mt-8 flex justify-center gap-4'>
          <a
            href={redirect_link}
            className='inline-block rounded-lg bg-blue-600 px-5 py-3 text-base font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50'
          >
            Find Your Crew Now
          </a>
        </div>
      </main>

      {/* How It Works Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900'>
              Connect in 3 Easy Steps
            </h2>
            <p className='mt-3 max-w-xl mx-auto text-lg text-gray-600'>
              We'll do the rest.
            </p>
          </div>
          <div className='mt-16 grid gap-12 md:grid-cols-3'>
            {/* Step 1 */}
            <div className='text-center'>
              <div className='flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 rounded-full text-blue-600'>
                <span className='text-2xl font-bold'>1</span>
              </div>
              <h3 className='mt-6 text-xl font-semibold text-gray-900'>
                Log In with MLT Slack
              </h3>
            </div>
            {/* Step 2 */}
            <div className='text-center'>
              <div className='flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 rounded-full text-blue-600'>
                <span className='text-2xl font-bold'>2</span>
              </div>
              <h3 className='mt-6 text-xl font-semibold text-gray-900'>
                Share Your Airport 
              </h3>
            </div>
            {/* Step 3 */}
            <div className='text-center'>
              <div className='flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 rounded-full text-blue-600'>
                <span className='text-2xl font-bold'>3</span>
              </div>
              <h3 className='mt-6 text-xl font-semibold text-gray-900'>
                Discover Matches
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='flex flex-col md:flex-row gap-y-8 md:gap-x-8'>
            {/* <div className='flex-1'>
              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md'>
                  <CssIcon type='plane' className='text-blue-600' />
                </div>
                <div>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    Same-Flight Coordination
                  </h3>
                  <p className='mt-1 text-gray-600'>
                    Find fellows on your exact flight. Plan to meet at the gate
                    or even sit together.
                  </p>
                </div>
              </div>
            </div> */}
            <div className='flex-1'>
              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md'>
                  <CssIcon type='users' className='text-blue-600' />
                </div>
                <div>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    Airport Overlap Matching
                  </h3>
                  <p className='mt-1 text-gray-600'>
                    Arriving around the same time? Coordinate a rideshare, grab
                    coffee, or just say hello.
                  </p>
                </div>
              </div>
            </div>
            <div className='flex-1'>
              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md'>
                  <CssIcon type='notification' className='text-blue-600' />
                </div>
                <div>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    Instant Slack Alerts
                  </h3>
                  <p className='mt-1 text-gray-600'>
                    Get a DM the moment a new match is found. No need to
                    constantly check the app.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className='bg-white'>
        <div className='container mx-auto px-6 py-20 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900'>
            Ready to find Fellows?
          </h2>
          <p className='mt-3 max-w-xl mx-auto text-lg text-gray-600'>
            Your next connection is just a flight away.
          </p>
          <div className='mt-8'>
            <a
              href={redirect_link}
              className='inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white'
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
