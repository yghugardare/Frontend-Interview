import {
  TrendingUp,
  GraduationCap,
  Scale,
  Lightbulb,
  Settings,
  DollarSign,
  BookOpen,
  Briefcase,
  Heart,
  Shield,
} from "lucide-react"
import { LucideIcon } from "lucide-react"

const categoryIconMap: Record<string, LucideIcon> = {
  FINANCE: TrendingUp,
  TECH: Settings,
  CAREER: GraduationCap,
  EDUCATION: BookOpen,
  REGULATIONS: Scale,
  SKILLS: Lightbulb,
  TECHNOLOGY: Settings,
  LIFESTYLE: Heart,
  FINANCE_TECH: TrendingUp,
}

export function getCategoryIcon(category: string): LucideIcon {
  return categoryIconMap[category.toUpperCase()] || Settings
}

export function getPrimaryCategory(categories: string[]): string {
  return categories[0] || "GENERAL"
}
