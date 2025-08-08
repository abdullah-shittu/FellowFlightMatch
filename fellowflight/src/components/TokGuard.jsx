import { useEffect } from 'react'
import { useRouter } from 'next/navigation' // or react-router
import { usePathname } from 'next/navigation'
function useAuthGuard () {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('fellowflight_access_token='))
      ?.split('=')[1]

    const formComplete = document.cookie
      .split('; ')
      .find(row => row.startsWith('fellowflight_form_completez='))
      ?.split('=')[1]

    const currentPath = window.location.pathname

    if (!token) {
      if (currentPath !== '/') {
        router.replace('/')
      }
    } else {
      if (formComplete !== 'true' && currentPath !== '/form') {
        router.replace('/form')
      } else if (formComplete === 'true' && currentPath !== '/matches') {
        router.replace('/matches')
      }
    }
  }, [pathname,router])
}

export default useAuthGuard
