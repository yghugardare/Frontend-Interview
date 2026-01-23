export interface Blog {
  id: string
  title: string
  category: string[]
  description: string
  date: string
  coverImage: string
  content: string
}

export interface BlogFormData {
  title: string
  category: string[]
  description: string
  coverImage: string
  content: string
}

