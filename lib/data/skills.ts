import { Skill } from '@/lib/types'

export const skills: Skill[] = [
  // Frontend Technologies
  {
    name: 'React',
    level: 'advanced',
    category: 'frontend',
    icon: 'react',
  },
  {
    name: 'Next.js',
    level: 'intermediate',
    category: 'frontend',
    icon: 'nextjs',
  },
  {
    name: 'TypeScript',
    level: 'intermediate',
    category: 'frontend',
    icon: 'typescript',
  },
  {
    name: 'JavaScript',
    level: 'expert',
    category: 'frontend',
    icon: 'javascript',
  },
  {
    name: 'HTML5',
    level: 'expert',
    category: 'frontend',
    icon: 'html5',
  },
  {
    name: 'CSS3',
    level: 'advanced',
    category: 'frontend',
    icon: 'css3',
  },
  {
    name: 'Tailwind CSS',
    level: 'advanced',
    category: 'frontend',
    icon: 'tailwind', 
  },
  
  // Backend Technologies
  {
    name: 'Node.js',
    level: 'advanced',
    category: 'backend',
    icon: 'nodejs',
  },
  {
    name: 'Express.js',
    level: 'advanced',
    category: 'backend',
    icon: 'express',
  },
  {
    name: 'PHP',
    level: 'intermediate',
    category: 'backend',
    icon: 'php',
  },
  {
    name: 'Laravel',
    level: 'intermediate',
    category: 'backend',
    icon: 'laravel',
  },
  {
    name: 'REST APIs',
    level: 'intermediate',
    category: 'backend',
    icon: '',
  },

  // Databases
  {
    name: 'MySQL',
    level: 'expert',
    category: 'database',
    icon: 'mysql',
  },
  {
    name: 'MongoDB',
    level: 'advanced',
    category: 'database',
    icon: 'mongodb',
  },
  {
    name: 'PostgreSQL',
    level: 'intermediate',
    category: 'database',
    icon: 'postgresql',
  },
  {
    name: 'Redis',
    level: 'beginner',
    category: 'database',
    icon: 'redis',
  },

  // Tools & Platforms
  {
    name: 'Git',
    level: 'advanced',
    category: 'tools',
    icon: 'git',
  },
  {
    name: 'GitHub',
    level: 'advanced',
    category: 'tools',
    icon: 'github',
  },
  {
    name: 'Docker',
    level: 'intermediate',
    category: 'tools',
    icon: 'docker',
  },
  {
    name: 'AWS',
    level: 'beginner',
    category: 'tools',
    icon: 'aws',
  },
  {
    name: 'Vercel',
    level: 'intermediate',
    category: 'tools',
    icon: 'vercel',
  },
  {
    name: 'Netlify',
    level: 'intermediate',
    category: 'tools',
    icon: 'netlify',
  },
  {
    name: 'Railway',
    level: 'intermediate',
    category: 'tools',
    icon: 'railway',
  },
  {
    name: 'VS Code',
    level: 'expert',
    category: 'tools',
    icon: 'vscode',
  },
  {
    name: 'Claude Code',
    level: 'intermediate',
    category: 'tools',
    icon: 'claude',
  },
  {
    name: 'Cursor',
    level: 'intermediate',
    category: 'tools',
    icon: 'cursor',
  },
  {
    name: 'IntelliJ IDEA',
    level: 'intermediate',
    category: 'tools',
    icon: 'intellij',
  },
  {
    name: 'Postman',
    level: 'intermediate',
    category: 'tools',
    icon: 'postman',
  },

  // Programming Languages
  {
    name: 'SQL',
    level: 'advanced',
    category: 'languages',
    icon: 'sql',
  },
  {
    name: 'Java',
    level: 'intermediate',
    category: 'languages',
    icon: 'java',
  },
  {
    name: 'C++',
    level: 'intermediate',
    category: 'languages',
    icon: 'cpp',
    years: 1
  },
  {
    name: 'Python',
    level: 'beginner',
    category: 'languages',
    icon: 'python',
    years: 1
  },

  // Concepts & Methodologies
  {
    name: 'Object-Oriented Programming',
    level: 'advanced',
    category: 'concepts',
    icon: '',
  },
  {
    name: 'MVC Architecture',
    level: 'advanced',
    category: 'concepts',
    icon: '',
  },
  {
    name: 'Agile/Scrum',
    level: 'advanced',
    category: 'concepts',
    icon: '',
  },
  {
    name: 'CI/CD',
    level: 'intermediate',
    category: 'concepts',
    icon: '',
  },
  {
    name: 'Testing',
    level: 'intermediate',
    category: 'concepts',
    icon: '',
  },
  {
    name: 'Responsive Design',
    level: 'intermediate',
    category: 'concepts',
    icon: '',
  },
  {
    name: 'Performance Optimization',
    level: 'intermediate',
    category: 'concepts',
    icon: '',
  },
  {
    name: 'SEO',
    level: 'intermediate',
    category: 'concepts',
    icon: '',
  }
]

// Helper functions to categorize and filter skills
export const getSkillsByCategory = (category: Skill['category']): Skill[] => {
  return skills.filter(skill => skill.category === category)
}

export const getSkillsByLevel = (level: Skill['level']): Skill[] => {
  return skills.filter(skill => skill.level === level)
}

export const getFeaturedSkills = (): Skill[] => {
  return skills.filter(skill => 
    ['expert', 'advanced', 'intermediate'].includes(skill.level) && 
    ['frontend', 'backend', 'database'].includes(skill.category)
  )
}

export const skillCategories = {
  frontend: 'Frontend',
  backend: 'Backend', 
  database: 'Database',
  tools: 'Tools & Platforms',
  languages: 'Languages',
  concepts: 'Concepts'
} as const