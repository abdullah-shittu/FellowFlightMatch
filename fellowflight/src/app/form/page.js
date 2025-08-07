'use client'
import React, { use } from 'react'
import MailingListForm from '@/components/Forms'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuthGuard from '@/components/TokGuard'
// Helper component for creating icons with only divs and Tailwind CSS

// Main About Page Component
export default function FormPage () {
    // useAuthGuard();
    const router = useRouter()
  
    // useEffect(() => {
    //   const isAuthenticated = localStorage.getItem('jwt')
    //   if (!isAuthenticated) {
    //     auth_url = "slack_url"
    //     router.push(auth_url) // redirect client-side
    //   }
    // }, [])
  return (
    <div className='flex items-center justify-center min-h-screen px-4'>
      <div className='relative p-1 bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 animate-gradient-rotate rounded-xl'>
        <div className='bg-white dark:bg-gray-900 rounded-lg w-full max-w-3xl p-12'>
          <MailingListForm />
        </div>
      </div>
    </div>
  )
}
