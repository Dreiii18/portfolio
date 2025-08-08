import { Suspense } from 'react'
import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about'
import { ProjectsSection } from '@/components/sections/projects'
import { ExperienceSection } from '@/components/sections/experience'
import { SkillsSection } from '@/components/sections/skills'
import { ContactSection } from '@/components/sections/contact'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <main className="relative">
      <Navigation />
      
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <ProjectsSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <ExperienceSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <SkillsSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <ContactSection />
      </Suspense>
      
      <Footer />
    </main>
  )
}