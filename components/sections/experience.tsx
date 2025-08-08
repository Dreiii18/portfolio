'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children'
import { experiences } from '@/lib/data/experience'
import { formatDate, calculateDuration } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 lg:py-32 bg-gray-50">
      <div className="section-container">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              From student to professional developer, here's my educational and professional journey.
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 transform md:-translate-x-0.5" />

          <StaggerChildren className="space-y-12">
            {experiences.map((experience, index) => (
              <StaggerItem key={experience.id}>
                <ExperienceCard 
                  experience={experience} 
                  index={index}
                  isLeft={index % 2 === 0}
                />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  )
}

interface ExperienceCardProps {
  experience: any
  index: number
  isLeft: boolean
}

function ExperienceCard({ experience, index, isLeft }: ExperienceCardProps) {
  return (
    <div className={cn(
      "relative flex items-center",
      isLeft ? "md:flex-row" : "md:flex-row-reverse"
    )}>
      {/* Timeline dot */}
      <motion.div
        className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full transform -translate-x-2 md:-translate-x-2 border-4 border-white z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: index * 0.1 }}
      />

      {/* Card */}
      <motion.div
        className={cn(
          "w-full md:w-5/12 ml-16 md:ml-0",
          isLeft ? "md:mr-8" : "md:ml-8"
        )}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">
                {experience.title}
              </h3>
              <span className={cn(
                'px-3 py-1 rounded-full text-xs font-medium',
                experience.type === 'work'
                  ? 'bg-green-100 text-green-800'
                  : experience.type === 'education'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800'
              )}>
                {experience.type === 'work' ? 'Work' : experience.type === 'education' ? 'Education' : 'Certification'}
              </span>
            </div>
            
            <p className="text-primary-600 font-semibold">
              {experience.company}
            </p>
            
            <p className="text-gray-500 text-sm">
              {experience.location} • {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
            </p>
            
            <p className="text-gray-400 text-xs">
              {calculateDuration(experience.startDate, experience.endDate)}
            </p>
          </div>

          {/* Description */}
          <ul className="space-y-2 mb-4">
            {experience.description.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm">{item}</span>
              </li>
            ))}
          </ul>

          {/* Achievements */}
          {experience.achievements && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                Key Achievements:
              </h4>
              <ul className="space-y-1">
                {experience.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {experience.technologies && (
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* GPA and Honors for education */}
          {experience.type === 'education' && (experience.gpa || experience.honors) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              {experience.gpa && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">GPA:</span> {experience.gpa}/4.0
                </p>
              )}
              {experience.honors && (
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Honors:</p>
                  <ul className="space-y-1">
                    {experience.honors.map((honor: string, idx: number) => (
                      <li key={idx} className="text-sm text-accent-600">
                        {honor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}