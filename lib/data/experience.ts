import { Experience } from '@/lib/types'

export const experiences: Experience[] = [
  {
    id: 'langara-college',
    title: 'Computer Studies Diploma',
    company: 'Langara College',
    location: 'Vancouver, BC, Canada',
    type: 'education',
    startDate: 'Sep 2023',
    endDate: 'Apr 2025',
    description: [
      'Pursuing Computer Studies Diploma with focus on full-stack web development',
      'Learning modern programming languages and web technologies',
      'Developing practical skills through hands-on projects and assignments',
      'Collaborating on team projects using industry-standard development practices'
    ],
    achievements: [
      'GPA: 3.62/4.33',
      'Dean\'s Honor Roll: Fall 2023, Spring 2024, Fall 2024',
      'Consistent academic excellence across all semesters',
      'Active participation in coding projects and presentations'
    ],
    technologies: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'PHP', 'Java', 'C++', 'Python', 'MySQL', 'MongoDB'],
    gpa: '3.62',
    honors: ['Dean\'s Honor Roll - Fall 2023', 'Dean\'s Honor Roll - Spring 2024', 'Dean\'s Honor Roll - Fall 2024']
  },
  {
    id: 'mirnah-technology',
    title: 'Junior Software Developer',
    company: 'Mirnah Technology System',
    location: 'Remote',
    type: 'work',
    startDate: 'Jun 2024',
    endDate: 'Aug 2024',
    description: [
      'Developed and maintained web applications using modern JavaScript frameworks',
      'Collaborated with senior developers on feature implementation and bug fixes',
      'Participated in code reviews and followed best practices for clean code',
      'Contributed to improving application performance and user experience'
    ],
    achievements: [
      'Maintained 99% uptime for production applications',
      'Successfully implemented 5+ new features within deadline',
      'Reduced bug reports by 30% through thorough testing',
      'Received positive feedback for code quality and teamwork'
    ],
    technologies: ['C++', 'Visual Basics', 'MySQL', 'WINDEV', 'Agile/Scrum']
  },
]