'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children'
import { TechIcon } from '@/components/ui/tech-icon'
import { skills, getSkillsByCategory, skillCategories } from '@/lib/data/skills'
import { cn } from '@/lib/utils'

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof skillCategories>('frontend')

  const categorySkills = getSkillsByCategory(selectedCategory)

  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="section-container">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise across different domains of web development.
            </p>
          </div>
        </FadeIn>

        {/* Category Tabs */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {(Object.keys(skillCategories) as Array<keyof typeof skillCategories>).map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-6 py-3 rounded-full font-medium transition-all duration-300',
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-100'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {skillCategories[category]}
              </motion.button>
            ))}
          </div>
        </FadeIn>

        {/* Skills Grid */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categorySkills.map((skill, index) => (
              <StaggerItem key={skill.name}>
                <SkillCard skill={skill} index={index} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </motion.div>

        {/* Skills Summary */}
        <FadeIn delay={0.8}>
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {skills.filter(s => s.level === 'expert').length}
                </div>
                <div className="text-gray-700">Expert Level</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {skills.filter(s => s.level === 'advanced').length}
                </div>
                <div className="text-gray-700">Advanced</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {skills.filter(s => s.level === 'intermediate').length}
                </div>
                <div className="text-gray-700">Intermediate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {Object.keys(skillCategories).length}
                </div>
                <div className="text-gray-700">Skill Categories</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

interface SkillCardProps {
  skill: any
  index: number
}

function SkillCard({ skill, index }: SkillCardProps) {
  const levelColors = {
    expert: 'from-green-400 to-emerald-500',
    advanced: 'from-blue-400 to-indigo-500',
    intermediate: 'from-yellow-400 to-orange-500',
    beginner: 'from-gray-400 to-gray-500'
  }

  const levelWidths = {
    expert: '90%',
    advanced: '75%',
    intermediate: '60%',
    beginner: '40%'
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Icon */}
      {skill.icon && (
        <div className="mb-3 group-hover:scale-110 transition-transform duration-300 text-primary-600">
          <TechIcon name={skill.icon} className="w-8 h-8" />
        </div>
      )}

      {/* Name */}
      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
        {skill.name}
      </h3>

      {/* Level */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 capitalize">
            {skill.level}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className={cn(
              'h-2 rounded-full bg-gradient-to-r',
              levelColors[skill.level as keyof typeof levelColors]
            )}
            initial={{ width: 0 }}
            whileInView={{ width: levelWidths[skill.level as keyof typeof levelWidths] }}
            transition={{ duration: 1, delay: index * 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  )
}