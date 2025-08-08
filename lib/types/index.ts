export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  features: string[]
  image: string
  images: string[]
  liveUrl?: string
  githubUrl?: string
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile'
  featured: boolean
  year: string
  status: 'completed' | 'in-progress' | 'planned'
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  type: 'work' | 'education' | 'certification'
  startDate: string
  endDate?: string
  current?: boolean
  description: string[]
  achievements?: string[]
  technologies?: string[]
  gpa?: string
  honors?: string[]
}

export interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'languages' | 'concepts'
  icon: string
  years?: number
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  username?: string
  color?: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
  availability: string
  socialLinks: SocialLink[]
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
}

export interface AnimationVariants {
  hidden: {
    opacity: number
    y?: number
    x?: number
    scale?: number
  }
  visible: {
    opacity: number
    y?: number
    x?: number
    scale?: number
    transition?: {
      duration?: number
      delay?: number
      ease?: string
    }
  }
}

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
}

export interface Navigation {
  id: string
  label: string
  href: string
  external?: boolean
}