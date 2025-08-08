'use client'

import { ReactNode, useState, useEffect } from 'react'
import { usePrefersReducedMotion } from '@/components/utils/mobile-detector'

interface PerformanceWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  enabledOnMobile?: boolean
}

export function PerformanceWrapper({ 
  children, 
  fallback = null,
  enabledOnMobile = false 
}: PerformanceWrapperProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Don't render animations if:
  // - Not mounted yet (SSR)
  // - User prefers reduced motion
  // - On mobile and not explicitly enabled
  if (!mounted || prefersReducedMotion || (isMobile && !enabledOnMobile)) {
    return <>{fallback || children}</>
  }

  return <>{children}</>
}

// Higher-order component for lazy loading heavy components
export function LazyPerformance<T extends object>(
  Component: React.ComponentType<T>,
  fallback: ReactNode = <div>Loading...</div>
) {
  return function LazyComponent(props: T) {
    const [shouldRender, setShouldRender] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768)
      checkMobile()
      
      // Delay rendering on mobile to improve initial load
      const delay = isMobile ? 100 : 0
      const timer = setTimeout(() => setShouldRender(true), delay)
      
      return () => clearTimeout(timer)
    }, [])

    if (!shouldRender) {
      return <>{fallback}</>
    }

    return <Component {...props} />
  }
}