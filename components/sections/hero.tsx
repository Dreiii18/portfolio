'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { personalInfo, contactInfo } from '@/lib/data/contact'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [particlePositions, setParticlePositions] = useState<Array<{x: number, y: number}>>([])
  
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 800], [0, 200])
  const particlesY = useTransform(scrollY, [0, 800], [0, -100])

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    setParticlePositions([...Array(isMobile ? 3 : 9)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    })))
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [isMobile])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
      
      {mounted && !isMobile && (
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{ y: backgroundY }}
        >
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl will-change-transform"
            animate={{
              x: [0, 50, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl will-change-transform"
            animate={{
              x: [0, -50, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
          
          <motion.div
            className="absolute top-1/3 right-1/4 w-48 h-48 bg-primary-300/10 rounded-full blur-2xl will-change-transform"
            animate={{
              x: [0, 30, 0],
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-accent-300/10 rounded-full blur-2xl will-change-transform"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        </motion.div>
      )}
      
      {mounted && isMobile && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-48 h-48 bg-primary-200/10 rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent-200/10 rounded-full blur-2xl" />
        </div>
      )}
      
      {mounted && (
        <motion.div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={!isMobile ? { y: particlesY } : {}}
        >
          {particlePositions.map((pos, i) => {
            const particleVariants = [
              "w-3 h-3 rounded-full",
              "w-2 h-2 rotate-45",
              "w-4 h-4 rounded-full",
              "w-2.5 h-2.5 rotate-45",
              "w-3.5 h-3.5 rounded-sm rotate-12"
            ]
            const colors = [
              "bg-primary-400/15",
              "bg-accent-400/15", 
              "bg-primary-300/20",
              "bg-accent-300/20"
            ]
            
            return (
              <motion.div
                key={i}
                className={cn(
                  "absolute will-change-transform",
                  particleVariants[i % particleVariants.length],
                  colors[i % colors.length]
                )}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                }}
                animate={isMobile ? {} : {
                  y: [0, -20 - (i % 3) * 5, 0],
                  x: [0, (i % 2 === 0 ? 5 : -5), 0],
                  opacity: [0.2, 0.5 + (i % 3) * 0.1, 0.2],
                  rotate: i % 2 === 0 ? [0, 360, 0] : [0, -180, 0],
                }}
                transition={isMobile ? {} : {
                  duration: 4 + i + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "linear"
                }}
              />
            )
          })}
        </motion.div>
      )}

      <div className="section-container relative z-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
            <FadeIn direction="left" delay={0.2}>
              <motion.p 
                className="text-primary-600 font-medium mb-3 sm:mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Hello, I'm
              </motion.p>
            </FadeIn>

            <FadeIn direction="left" delay={0.3}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="gradient-text">{personalInfo.name}</span>
              </h1>
            </FadeIn>

            <FadeIn direction="left" delay={0.4}>
              <h2 className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-gray-700 font-light mb-4 sm:mb-6 px-2 sm:px-0">
                {personalInfo.title}
              </h2>
            </FadeIn>

            <FadeIn direction="left" delay={0.5}>
              <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-xl mx-auto px-2 sm:px-4 leading-relaxed">
                {personalInfo.tagline}
              </p>
            </FadeIn>

            <FadeIn direction="left" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
                <motion.button
                  onClick={() => scrollToSection('#projects')}
                  className="btn-primary w-full sm:w-auto min-w-[180px] py-3 px-6"
                  whileHover={isMobile ? {} : { scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.button>
                
                <motion.button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-secondary w-full sm:w-auto min-w-[180px] py-3 px-6"
                  whileHover={isMobile ? {} : { scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.7}>
              <div className="flex justify-center items-center space-x-4 sm:space-x-6 mt-6 sm:mt-8 px-4 sm:px-0">
                {contactInfo.socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target={social.url.startsWith('http') ? '_blank' : undefined}
                    rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="p-2.5 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 group touch-manipulation"
                    whileHover={isMobile ? {} : { scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <SocialIcon name={social.icon} className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-primary-600 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </FadeIn>
          
          <FadeIn direction="up" delay={0.8}>
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 mx-4 sm:mx-0">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 text-center max-w-md mx-auto">
                <div className="space-y-1 sm:space-y-2">
                  <div className="text-xl sm:text-2xl font-bold text-space_cadet-500">3</div>
                  <div className="text-xs sm:text-sm text-gray-700 leading-tight">Projects Completed</div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <div className="text-xl sm:text-2xl font-bold text-space_cadet-500">99%</div>
                  <div className="text-xs sm:text-sm text-gray-700 leading-tight">Uptime Record</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

      </div>

      <motion.div 
        className="absolute bottom-6 sm:bottom-8 w-full z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="flex justify-center">
        <motion.button 
          onClick={() => scrollToSection('#about')}
          className="flex flex-col items-center space-y-1 sm:space-y-2 text-gray-600 hover:text-primary-600 transition-colors duration-300 touch-manipulation"
          aria-label="Scroll to about section"
          animate={isMobile ? {} : { y: [0, 8, 0] }}
          transition={isMobile ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs sm:text-sm font-medium">Scroll</span>
          <svg 
            className="w-3 h-6 sm:w-4 sm:h-8 text-current opacity-70" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.button>
        </div>
      </motion.div>
    </section>
  )
}

function SocialIcon({ name, className }: { name: string; className?: string }) {
  const iconMap = {
    linkedin: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    github: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    mail: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    phone: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  }

  return iconMap[name as keyof typeof iconMap] || null
}