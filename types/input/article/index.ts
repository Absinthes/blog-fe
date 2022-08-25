export interface ArticleUpdateInput {
  id: string
  weight?: number
  title?: string
  summary?: string
  content?: string
  isPublic?: boolean
  tags?: string[]
  groups?: string[]
}