import { Project } from '@/lib/types'

export const projects: Project[] = [
  {
    id: 'paz-car-rental',
    title: 'PAZ Car Rental Platform',
    description: 'Full-stack car rental platform with JWT authentication, payment processing, and real-time vehicle availability.',
    longDescription: 'A comprehensive car rental management system featuring user authentication, role-based access control, integrated payment processing with PayMongo, and real-time vehicle availability tracking. Built with modern full-stack technologies for optimal performance and user experience.',
    technologies: ['TypeScript', 'React', 'Next.js', 'Express.js', 'PostgreSQL', 'Redux Toolkit', 'PayMongo API', 'Netlify'],
    features: [
      'Full-stack rental platform architecture',
      'JWT authentication and session management',
      'Role-based access control system',
      'PayMongo payment integration',
      'Redux Toolkit state management',
      'Real-time vehicle availability tracking',
      'Regional booking services',
      'Responsive user interface',
      'Admin dashboard for fleet management',
      'Booking history and management'
    ],
    image: '/images/paz-hero.png',
    images: [
      '/images/paz-hero.png',
      '/images/projects/paz-rental-fleet.jpg',
      '/images/projects/paz-rental-booking.jpg',
      '/images/projects/paz-rental-dashboard.jpg'
    ],
    liveUrl: 'https://paz-car-rental.netlify.app',
    category: 'fullstack',
    featured: true,
    year: '2025',
    status: 'in-progress'
  },
  {
    id: 'scanpro-concrete',
    title: 'ScanPro Concrete Imaging',
    description: 'Professional business website for concrete imaging services with SEO optimization and modern design.',
    longDescription: 'A comprehensive business website for ScanPro Concrete Imaging, featuring professional design, SEO optimization, dynamic routing, and integrated contact systems. Built with modern web technologies to showcase concrete imaging services and generate leads.',
    technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Netlify'],
    features: [
      'Professional business website design',
      'SEO optimization for search visibility',
      'Dynamic routing and content management',
      'MongoDB integration for data storage',
      'Responsive design for all devices',
      'Advanced form validation',
      'Performance optimized loading'
    ],
    image: '/images/scanpro-hero.png',
    images: [
      '/images/scanpro-hero.png',
      '/images/projects/scanpro-services.jpg',
      '/images/projects/scanpro-contact.jpg'
    ],
    liveUrl: 'https://scanproconcreteimaging.netlify.app',
    category: 'fullstack',
    featured: true,
    year: '2025',
    status: 'completed'
  },
  {
    id: 'portfolio',
    title: 'Personal Developer Portfolio',
    description: 'Modern portfolio website showcasing full-stack development skills and professional projects.',
    longDescription: 'A comprehensive developer portfolio built with Next.js and TypeScript, featuring dark/light theme support, responsive design, and modern animations. Showcases professional projects, technical skills, and career journey through an intuitive and visually appealing interface.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    features: [
      'Modern responsive design with animations',
      'Project showcase with detailed views',
      'Skills and technologies display',
      'Professional experience timeline',
      'Contact form integration',
      'SEO optimization',
      'Performance optimized',
      'Mobile-first approach',
      'Accessibility compliant'
    ],
    image: '/images/portfolio-hero.png',
    images: [
      '/images/portfolio-hero.png',
      '/images/projects/portfolio-projects.jpg',
      '/images/projects/portfolio-about.jpg',
      '/images/projects/portfolio-contact.jpg'
    ],
    liveUrl: 'https://portfolio-roan-nine-u51zkyxgwk.vercel.app',
    githubUrl: 'https://github.com/Dreiii18/portfolio',
    category: 'fullstack',
    featured: true,
    year: '2025',
    status: 'completed'
  },
  {
    id: 'laundryping',
    title: 'LaundryPing',
    description: 'SMS notification app for Philippine laundromats — sends "laundry done" alerts to customers via Semaphore.',
    longDescription: 'A simple, low-friction web app for Philippine laundromats that sends "laundry done" SMS notifications to customers. Built to replace manual phone calls and paper logbooks with a tap-tap-done workflow. Features multi-tenant architecture with Row-Level Security, AES-256-GCM phone encryption, bilingual Tagalog/English SMS templates, and a free tier of 50 SMS/month per shop.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Semaphore API', 'shadcn/ui'],
    features: [
      'PH-optimized bilingual SMS notifications via Semaphore',
      'Free tier with 50 SMS/month per laundromat',
      'AES-256-GCM phone number encryption at rest',
      'Idempotent triple-layer SMS duplicate protection',
      'Multi-tenant Row-Level Security from day one',
      'Machine and job management dashboard',
      'Mobile-first design for budget Android devices',
      'Real-time SMS quota tracking'
    ],
    image: '/images/laundryping-hero.png',
    images: ['/images/laundryping-hero.png'],
    liveUrl: 'https://laundryping.ph',
    githubUrl: 'https://github.com/Dreiii18/LaundryPing',
    category: 'fullstack',
    featured: true,
    year: '2026',
    status: 'in-progress'
  },
]