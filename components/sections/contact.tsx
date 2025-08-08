'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { contactInfo } from '@/lib/data/contact'
import { isValidEmail, copyToClipboard } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Use the enhanced field validation for all fields
    newErrors.name = validateField('name', formData.name)
    newErrors.email = validateField('email', formData.email)
    newErrors.subject = validateField('subject', formData.subject)
    newErrors.message = validateField('message', formData.message)

    // Remove empty error messages
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) {
        delete newErrors[key]
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Create a timeout promise for faster UX
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000) // 10 second timeout
      })

      const fetchPromise = fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const response = await Promise.race([fetchPromise, timeoutPromise])

      const data = await response.json()

      if (!response.ok) {
        // Handle validation errors from the server
        if (data.details && Array.isArray(data.details)) {
          const serverErrors: Record<string, string> = {}
          data.details.forEach((error: string) => {
            // Map server errors to field names
            if (error.toLowerCase().includes('name')) {
              serverErrors.name = error
            } else if (error.toLowerCase().includes('email')) {
              serverErrors.email = error
            } else if (error.toLowerCase().includes('subject')) {
              serverErrors.subject = error
            } else if (error.toLowerCase().includes('message')) {
              serverErrors.message = error
            }
          })
          setErrors(serverErrors)
        }
        throw new Error(data.error || 'Failed to send message')
      }

      // Success
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
      
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateField = (name: string, value: string) => {
    const trimmedValue = value.trim()
    let error = ''

    switch (name) {
      case 'name':
        if (!trimmedValue) {
          error = 'Name is required'
        } else if (trimmedValue.length < 2) {
          error = 'Name must be at least 2 characters'
        } else if (!/^[a-zA-Z\s'-]+$/.test(trimmedValue)) {
          error = 'Name can only contain letters, spaces, hyphens, and apostrophes'
        } else if (/^[^a-zA-Z]*$/.test(trimmedValue)) {
          error = 'Name must contain at least some letters'
        } else if (trimmedValue.length > 50) {
          error = 'Name cannot exceed 50 characters'
        }
        break
      case 'email':
        if (!trimmedValue) {
          error = 'Email is required'
        } else if (!isValidEmail(value)) {
          error = 'Please enter a valid email'
        } else if (trimmedValue.length > 100) {
          error = 'Email cannot exceed 100 characters'
        }
        break
      case 'subject':
        if (!trimmedValue) {
          error = 'Subject is required'
        } else if (trimmedValue.length < 3) {
          error = 'Subject must be at least 3 characters'
        } else if (!/[a-zA-Z]/.test(trimmedValue)) {
          error = 'Subject must contain at least some letters'
        } else if (/^[!@#$%^&*()_+=\-[\]{}|\\:";'<>?,.\/~`]*$/.test(trimmedValue)) {
          error = 'Subject cannot contain only special characters'
        } else if (trimmedValue.length > 100) {
          error = 'Subject cannot exceed 100 characters'
        }
        break
      case 'message':
        if (!trimmedValue) {
          error = 'Message is required'
        } else if (trimmedValue.length < 10) {
          error = 'Message must be at least 10 characters'
        } else if (!/[a-zA-Z]/.test(trimmedValue)) {
          error = 'Message must contain at least some letters'
        } else if (/^[!@#$%^&*()_+=\-[\]{}|\\:";'<>?,.\/~`\s]*$/.test(trimmedValue)) {
          error = 'Message cannot contain only special characters or spaces'
        } else if (trimmedValue.length > 1000) {
          error = 'Message cannot exceed 1000 characters'
        } else {
          // Check for meaningful content (not just repeated characters)
          const uniqueChars = new Set(trimmedValue.toLowerCase().replace(/\s/g, '')).size
          if (uniqueChars < 3) {
            error = 'Message should contain more varied content'
          }
        }
        break
    }

    return error
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Real-time validation on every change
    const fieldError = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: fieldError }))
  }

  const copyContactInfo = async (text: string, type: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopiedItem(type)
      // Auto-hide the popover after 2 seconds
      setTimeout(() => {
        setCopiedItem(null)
      }, 2000)
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gray-50">
      <div className="section-container">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {contactInfo.availability}. Let's discuss your next project or opportunity.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <FadeIn direction="left">
            <div>
              <h3 className="text-2xl font-bold mb-8">Let's Connect</h3>
              
              <div className="space-y-6">
                {/* Email */}
                <motion.div 
                  className="relative flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer group hover:shadow-md transition-all duration-300"
                  whileHover={isMobile ? {} : { scale: 1.02 }}
                  onClick={() => copyContactInfo(contactInfo.email, 'Email')}
                >
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <EmailIcon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">{contactInfo.email}</p>
                  </div>
                  <CopyIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  
                  {/* Copied Popover */}
                  {copiedItem === 'Email' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      className="absolute -top-2 right-4 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10"
                    >
                      Copied!
                      <div className="absolute bottom-[-4px] right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Phone */}
                <motion.div 
                  className="relative flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer group hover:shadow-md transition-all duration-300"
                  whileHover={isMobile ? {} : { scale: 1.02 }}
                  onClick={() => copyContactInfo(contactInfo.phone, 'Phone')}
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <PhoneIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">{contactInfo.phone}</p>
                  </div>
                  <CopyIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  
                  {/* Copied Popover */}
                  {copiedItem === 'Phone' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      className="absolute -top-2 right-4 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10"
                    >
                      Copied!
                      <div className="absolute bottom-[-4px] right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Location */}
                <motion.div 
                  className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                  whileHover={isMobile ? {} : { scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <LocationIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600">{contactInfo.location}</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Find me online</h4>
                <div className="flex space-x-4">
                  {contactInfo.socialLinks.filter(link => link.name !== 'Email' && link.name !== 'Phone').map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <SocialIcon name={social.icon} className="w-5 h-5 text-gray-600" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-colors duration-200',
                      'bg-white text-gray-900',
                      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                      errors.name
                        ? 'border-red-300'
                        : 'border-gray-300'
                    )}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-colors duration-200',
                      'bg-white text-gray-900',
                      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                      errors.email
                        ? 'border-red-300'
                        : 'border-gray-300'
                    )}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  autoComplete="off"
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border transition-colors duration-200',
                    'bg-white text-gray-900',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                    errors.subject
                      ? 'border-red-300'
                      : 'border-gray-300'
                  )}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  autoComplete="off"
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border transition-colors duration-200 resize-none',
                    'bg-white text-gray-900',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                    errors.message
                      ? 'border-red-300'
                      : 'border-gray-300'
                  )}
                  placeholder="Tell me about your project or opportunity..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full py-3 px-6 rounded-lg font-medium transition-all duration-300',
                  'bg-primary-600 hover:bg-primary-700 text-white',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  isSubmitting && 'animate-pulse'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 text-center space-y-2"
                >
                  <p className="font-medium">Message received successfully!</p>
                  <p className="text-sm text-green-500">Your email is being sent and I'll get back to you soon.</p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-center"
                >
                  Sorry, there was an error sending your message. Please try again.
                </motion.p>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// Icon Components
function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
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
    )
  }

  return iconMap[name as keyof typeof iconMap] || null
}