import { Project } from '@/lib/types'

export const projects: Project[] = [
  {
    id: 'paz-car-rental',
    title: 'PAZ Car Rental Platform',
    description: 'Full-stack car rental platform with JWT authentication, payment processing, and real-time vehicle availability.',
    longDescription: 'A comprehensive car rental management system featuring user authentication, role-based access control, integrated payment processing with PayMongo, and real-time vehicle availability tracking. Built with modern full-stack technologies for optimal performance and user experience.',
    technologies: ['TypeScript', 'React', 'Next.js', 'Express.js', 'PostgreSQL', 'Redux Toolkit', 'PayMongo API'],
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
    technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Vercel'],
    features: [
      'Professional business website design',
      'SEO optimization for search visibility',
      'Dynamic routing and content management',
      'MongoDB integration for data storage',
      'Responsive design for all devices',
      'Dual email notification system',
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
]