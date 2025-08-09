'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/animations/fade-in'
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children'
import { projects } from '@/lib/data/projects'
import { cn } from '@/lib/utils'

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const filteredProjects = projects

  return (
    <section id="projects" className="py-20 lg:py-32">
      <div className="section-container">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              A showcase of my recent work, featuring modern web applications built with cutting-edge technologies and best practices.
            </p>
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <div>
            <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <StaggerItem key={project.id}>
                  <ProjectCard 
                    project={project}
                    onSelect={setSelectedProject}
                  />
                </StaggerItem>
              ))}
            </StaggerChildren>
        </div>

        {/* No projects message */}
        {filteredProjects.length === 0 && (
          <FadeIn>
            <div className="text-center py-12">
              <p className="text-gray-500">
                No projects found for the selected category.
              </p>
            </div>
          </FadeIn>
        )}

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={projects.find(p => p.id === selectedProject)!}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: any
  onSelect: (id: string) => void
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      className="project-card group cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => onSelect(project.id)}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-primary-100 to-accent-100">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.parentElement?.querySelector('.fallback-placeholder') as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Fallback placeholder */}
        <div 
          className="fallback-placeholder w-full h-full bg-gradient-to-br from-primary-200 to-accent-200 flex items-center justify-center"
          style={{ display: project.image && project.image.includes('/images/') ? 'none' : 'flex' }}
        >
          <span className="text-2xl font-bold text-primary-600">
            {project.title.split(' ').map((word: string) => word[0]).join('').slice(0, 3)}
          </span>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 bg-primary-500 text-white rounded-full text-xs font-medium">
              Featured
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={cn(
            'px-3 py-1 rounded-full text-xs font-medium',
            project.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : project.status === 'in-progress'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-blue-100 text-blue-800'
          )}>
            {project.status.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <span className="text-sm text-gray-500 flex-shrink-0 ml-2">
            {project.year}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech: string) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center space-x-4">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLinkIcon className="w-4 h-4" />
              <span>Live Demo</span>
            </motion.a>
          )}
          
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon className="w-4 h-4" />
              <span>Code</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

interface ProjectModalProps {
  project: any
  onClose: () => void
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {project.title}
              </h2>
              <p className="text-gray-600">
                {project.longDescription}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {project.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-4">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLinkIcon className="w-4 h-4" />
                <span>Visit Live Site</span>
              </motion.a>
            )}
            
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Source</span>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Icon Components
function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}