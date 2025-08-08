'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children'
import { TechIcon } from '@/components/ui/tech-icon'
import { personalInfo } from '@/lib/data/contact'
import { getFeaturedSkills } from '@/lib/data/skills'

export function AboutSection() {
  const featuredSkills = getFeaturedSkills()

  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-50">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <FadeIn direction="left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About <span className="gradient-text">Me</span>
              </h2>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {personalInfo.fullBio.split('\n\n')[0]}
              </p>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {personalInfo.fullBio.split('\n\n')[1]}
              </p>
            </FadeIn>

            <FadeIn direction="left" delay={0.3}>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {personalInfo.fullBio.split('\n\n')[2]}
              </p>
            </FadeIn>

            {/* Key Highlights */}
            <FadeIn direction="left" delay={0.4}>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Key Highlights
              </h3>
              <StaggerChildren className="space-y-3">
                {personalInfo.highlights.map((highlight, index) => (
                  <StaggerItem key={index}>
                    <div className="flex items-start space-x-3">
                      <motion.div
                        className="w-2 h-2 bg-primary-500 rounded-full mt-2.5 flex-shrink-0"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      />
                      <p className="text-gray-700">{highlight}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </FadeIn>
          </div>

          {/* Skills Grid */}
          <div>
            <FadeIn direction="right">
              <h3 className="text-2xl font-bold mb-8 text-center lg:text-left">
                Core <span className="gradient-text">Technologies</span>
              </h3>
            </FadeIn>

            <StaggerChildren className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {featuredSkills.slice(0, 9).map((skill, index) => (
                <StaggerItem key={skill.name}>
                  <motion.div
                    className="skill-card text-center group"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {skill.icon && (
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        <TechIcon name={skill.icon} className="w-8 h-8 mx-auto" />
                      </div>
                    )}
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {skill.name}
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: getSkillWidth(skill.level) }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1 capitalize">
                      {skill.level}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>

        {/* Interests & Current Focus */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Interests */}
            <FadeIn direction="up">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">
                Interests & Passions
              </h3>
              <div className="flex flex-wrap gap-3">
                {personalInfo.interests.map((interest, index) => (
                  <motion.span
                    key={interest}
                    className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </FadeIn>

            {/* Current Focus */}
            <FadeIn direction="up" delay={0.2}>
              <h3 className="text-xl font-semibold mb-6 text-gray-900">
                Current Focus
              </h3>
              <div className="space-y-3">
                {personalInfo.currentFocus.map((focus, index) => (
                  <motion.div
                    key={focus}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-accent-500 rounded-full mt-2.5 flex-shrink-0"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    />
                    <p className="text-gray-700">{focus}</p>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

function getSkillWidth(level: string): string {
  switch (level) {
    case 'expert':
      return '90%'
    case 'advanced':
      return '80%'
    case 'intermediate':
      return '65%'
    case 'beginner':
      return '40%'
    default:
      return '50%'
  }
}