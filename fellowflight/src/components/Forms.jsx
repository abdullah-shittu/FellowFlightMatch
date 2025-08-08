'use client'

import 'formsmd/dist/css/formsmd.min.css'
import { useEffect, useRef, useState } from 'react'
import { Composer, Formsmd } from 'formsmd'
import Papa from 'papaparse'
import Fuse from 'fuse.js'
import { useRouter } from 'next/navigation'
let fuse

fetch('/airports.csv')
  .then(res => res.text())
  .then(text => {
    Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      complete: parsed => {
        fuse = new Fuse(parsed.data, {
          keys: ['city', 'iata', 'region'],
          includeScore: true,
          threshold: 0.4
        })
      }
    })
  })

function showAirportSuggestions (inputEl, results) {
  // Remove old dropdown
  document.querySelectorAll('.airport-suggestions').forEach(el => el.remove())

  const container = document.createElement('div')
  container.className = 'airport-suggestions'
  container.style.position = 'absolute'
  container.style.background = 'white'
  container.style.border = '1px solid #ccc'
  container.style.zIndex = '1000'

  results.forEach(airport => {
    const option = document.createElement('div')
    option.textContent = `${airport.name} (${airport.iata}) - ${airport.city}, ${airport.country}`
    option.style.padding = '8px'
    option.style.cursor = 'pointer'

    option.addEventListener('click', () => {
      inputEl.value = `${airport.name} (${airport.iata})`
      container.remove()
    })

    container.appendChild(option)
  })

  inputEl.parentNode.appendChild(container)
}

async function handleFormSubmit (formData) {
  // Step 1: Format the formData
  console.log(formData)
  if (formData.success) router.push('/matches')
  return
  const dateObj = new Date(formData.dateTimeFlight)
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()
  const dateString = `${year}-${month}-${day}`

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(
    minutes
  ).padStart(2, '0')}`

  const formattedFlightCreate = {
    flight_number: 'NULL',
    date: dateString,
    dep_airport: formData.airport.trim(),
    departure_time: formattedTime,
    hours_early: Number(formData.hoursEarly)
  }

  const formattedUserUpdate = {
    linkedin_url: `https://linkedin.com/in/${formData.linkedInTag}`
  }

  console.log(formattedFlightCreate, formattedUserUpdate)

  // Step 2: Call your real API
  try {
    const flightRes = await fetch('https://your.api/flightCreateEndpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formattedFlightCreate)
    })

    if (!flightRes.ok) throw new Error('Flight creation failed')

    const userRes = await fetch('https://your.api/userUpdateEndpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formattedUserUpdate)
    })

    if (!userRes.ok) throw new Error('User update failed')

    const router = Router()
    router.push('/matches')
  } catch (err) {
    console.error('Submission error:', err)
    alert('Failed to submit form. Please try again.')
  }
}

const composer = new Composer({
  id: 'mailing-list-form',
  postUrl: 'https://api.fellowflightmatch.abdullah.buzz/api/v1/formHandler'
})

// Slide 1: Core Flight Information (Page Progress: 0%)
composer.textInput('airport', {
  question: 'Where are you flying from?',
  required: true,
  description:
    'Start typing your airport name, city or code (e.g., San Francisco, SFO).'
})
// composer.hiddenInput('airportId', {
//   value: '' // Will be filled in later by JS
// })
// composer.textInput('flightNumber', {
//   question: "What's your flight number?",
//   required: true,
//   description: 'You can find this on your confirmation email. (e.g., UA1234)'
// })

// Slide 2: Departure & Personal Preferences (Page Progress: 50%)
composer.slide({
  pageProgress: '50%'
})

composer.datetimeInput('dateTimeFlight', {
  question: 'When does your flight take off?',
  required: true,
  description:
    'The MLT seminar date is pre-filled. Click to select a different day.'
})

composer.numberInput('hoursEarly', {
  question: 'How early do you like to get to the airport?',
  required: true,
  description:
    'Let us know your check-in buffer! This helps us find you a match at the right time. (e.g., 2.5 hours)'
})

// Slide 3: Final Details & Submission (Page Progress: 95%)
composer.slide({
  pageProgress: '95%'
})

composer.textInput('linkedInTag', {
  question: "Lastly, what's your LinkedIn profile ID?",
  required: true,
  description:
    'We only need the part after linkedin.com/in/. (e.g., abdullah-shittu)'
})

composer.endSlide({
  submitText: 'Find My Matches' // or whatever you want the button to say
})
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
  const [style, setStyle] = useState({})
  const router = useRouter()
  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNGFmMmY3Yy0wNWNhLTQ1ZWMtYjI3Yi02YzIxNjYwMzFiOWIiLCJleHAiOjE3NTUxMjY2Mjh9.baHfR7scR-E6-Tw-xo4JE8rYAVVPbTeybQoqQUfw52A'

  useEffect(() => {
    const isMobile = window.innerWidth < 600
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

    if (containerRef.current) {
      const formsmd = new Formsmd(composer.template, containerRef.current, {
        postHeaders: {
          Authorization: `Bearer ${token}`
        },
        errorFieldKey: 'attr',
        errorMessageKey: 'detail'
      })
      // formsmd.onCompletion = handleFormSubmit
      formsmd.getSubmissionErrors = function (json) {
        console.log(json)
        const messages = []

        // Parse nested validation errors
        if (json.validation && json.validation.errors) {
          for (const error of json.validation.errors) {
            messages.push(`${error.attr}: ${error.detail}`)
          }
        }

        // Add general error message
        if (json.error) {
          messages.push(json.error)
        }
        if (json.detail) {
          messages.push(json.detail)
        }
        return messages
      }
      formsmd.onCompletion = () => {
        
        // router.push('/matches')
      }
      formsmd.init()
      document.addEventListener('input', e => {
        if (e.target.name === 'airport' && fuse) {
          const query = e.target.value
          if (query.length > 1) {
            const results = fuse
              .search(query)
              .slice(0, 5)
              .map(r => r.item)

            // Display a custom dropdown
            showAirportSuggestions(e.target, results)
          }
        }
      })
    }
    // document.getElementBId('mailing-list-form').addEventListener('submit', handleFormSubmit);
  }, [])

  return <div ref={containerRef} style={style}></div>
}
