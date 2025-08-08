'use client'

import { motion, type Variants } from 'framer-motion'
import { ReactNode, useState, useEffect } from 'react'

interface FadeInProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  distance?: number
  className?: string
  once?: boolean
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = '',
  once = true
}: FadeInProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const mobileDistance = isMobile ? Math.min(distance * 0.5, 15) : distance

  const directionVariants: Record<string, { x: number; y: number }> = {
    up: { x: 0, y: mobileDistance },
    down: { x: 0, y: -mobileDistance },
    left: { x: isMobile ? 0 : mobileDistance, y: 0 },
    right: { x: isMobile ? 0 : -mobileDistance, y: 0 }
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directionVariants[direction]
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: isMobile ? duration * 0.7 : duration,
        delay: isMobile ? delay * 0.5 : delay,
        ease: isMobile ? "easeOut" : [0.25, 0.4, 0.55, 1.4]
      }
    }
  }

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: isMobile ? '-50px' : '-100px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}