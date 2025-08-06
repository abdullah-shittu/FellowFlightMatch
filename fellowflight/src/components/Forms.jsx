'use client'

import 'formsmd/dist/css/formsmd.min.css'
import { useEffect, useRef } from 'react'
import { Composer, Formsmd } from 'formsmd'

const composer = new Composer({
  id: 'mailing-list-form',
  postUrl: 'https://localhost:3000/api/v1/formHandler'
})

// Slide 1: Core Flight Information (Page Progress: 0%)
composer.textInput('airport', {
  question: 'Where are you flying from?',
  description:
    'Start typing your airport name or code (e.g., San Francisco, SFO).'
})

composer.textInput('flightNumber', {
  question: "What's your flight number?",
  description: 'You can find this on your confirmation email. (e.g., UA1234)'
})

// Slide 2: Departure & Personal Preferences (Page Progress: 50%)
composer.slide({
  pageProgress: '50%'
})

composer.datetimeInput('dateTimeFlight', {
  question: 'When does your flight take off?',
  description:
    'The MLT seminar date is pre-filled. Click to select a different day.'
})

composer.numberInput('hoursEarly', {
  question: 'How early do you like to get to the airport?',
  description:
    'Let us know your check-in buffer! This helps us find you a match at the right time. (e.g., 2.5 hours)'
})

// Slide 3: Final Details & Submission (Page Progress: 95%)
composer.slide({
  pageProgress: '95%'
})

composer.textInput('linkedInTag', {
  question: "Lastly, what's your LinkedIn profile ID?",
  description:
    'We only need the part after linkedin.com/in/. (e.g., abdullah-shittu)'
})

composer.endSlide({})

// Final Slide: Thank You Message
composer.h1('Thank you!', {
  classNames: ['text-center']
})
composer.p(
  "You're all set. We're now actively searching for your flight matches. We will notify you via our Slack bot if we find anyone or you can go to [my matches]!",
  {
    classNames: ['text-center']
  }
)
export default function MailingListForm () {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      const formsmd = new Formsmd(composer.template, containerRef.current, {
        postHeaders: {
          Authorization: `Basic ${process.env.PUBLIC_API_KEY}`
        }
      })
      formsmd.init()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: window.innerWidth < '600px' ? '90vw' : '100%',
        maxWidth: '1000px',
        height: window.innerWidth < '600px' ? '80vh' : '70vh',
        margin: '0 auto'
      }}
    ></div>
  )
}
