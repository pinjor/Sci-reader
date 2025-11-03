import { createContext, useContext, useState, ReactNode } from 'react'

interface Paper {
  id: string
  title: string
  authors: string[]
  year: number
  source: string
  citations: number
  abstract: string
  badges: string[]
  saved?: boolean
  listened?: boolean
}

interface Project {
  id: string
  title: string
  papers: string[]
  members: string[]
  privacy: 'public' | 'private'
  createdAt: string
}

interface User {
  id: string
  name: string
  email: string
  occupation: string
  institution?: string
  orcid?: string
  interests: string[]
}

interface AppContextType {
  papers: Paper[]
  projects: Project[]
  user: User | null
  setPapers: (papers: Paper[]) => void
  setProjects: (projects: Project[]) => void
  addPaper: (paper: Paper) => void
  addProject: (project: Project) => void
  updatePaper: (id: string, updates: Partial<Paper>) => void
  updateProject: (id: string, updates: Partial<Project>) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [papers, setPapers] = useState<Paper[]>([
    {
      id: '1',
      title: 'User experience design (UX design) in a website development: website redesign',
      authors: ['Orlova, Mariia'],
      year: 2016,
      source: 'theseus.fi',
      citations: 21,
      abstract: 'The purpose of the study was to implement an approach of user experience for a website design. Mostly, I concentrated on revealing and understanding the concepts of UX design which include usability, visual design and human factors affecting the user experience.',
      badges: ['Open Access', 'Full Text'],
      saved: true,
      listened: false,
    },
    {
      id: '2',
      title: 'Implementasi re-design UI/UX website fumigasi untuk meningkatkan customer experience',
      authors: ['FM Akbar', 'AP Wardhanie', 'T Amelia'],
      year: 2023,
      source: 'journal.isas.or.id',
      citations: 15,
      abstract: 'Fumigation website is a website owned by PT. Prana Argentum which is used as a platform for disseminating information related to pest control.',
      badges: ['Listened'],
      saved: false,
      listened: true,
    },
  ])

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Website Re-design UI/UX',
      papers: ['1', '2'],
      members: ['john-doe', 'sara-johnson'],
      privacy: 'public',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Visual Design Trend',
      papers: ['1'],
      members: ['john-doe', 'sara-johnson', 'james-smith'],
      privacy: 'private',
      createdAt: '2024-01-20',
    },
  ])

  const [user, setUser] = useState<User | null>({
    id: 'john-doe',
    name: 'John Doe',
    email: 'johndoe@email.com',
    occupation: 'Scientist',
    institution: 'Bangladesh University',
    orcid: 'https://orcid.org/0000-0001-2345-6789',
    interests: ['UI/UX', 'Product Design', 'Product Research', 'Visual Design'],
  })

  const addPaper = (paper: Paper) => {
    setPapers([...papers, paper])
  }

  const addProject = (project: Project) => {
    setProjects([...projects, project])
  }

  const updatePaper = (id: string, updates: Partial<Paper>) => {
    setPapers(papers.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  return (
    <AppContext.Provider
      value={{
        papers,
        projects,
        user,
        setPapers,
        setProjects,
        addPaper,
        addProject,
        updatePaper,
        updateProject,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

