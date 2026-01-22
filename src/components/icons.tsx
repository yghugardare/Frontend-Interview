import { TrendingUp, Briefcase, BookOpen, Shield, Settings, Cpu } from 'lucide-react';

interface IconProps {
    category: string;
    className?: string;
}

export function CategoryIcon({ category, className }: IconProps) {
    switch (category.toUpperCase()) {
        case 'FINANCE':
            return <TrendingUp className={className} />;
        case 'CAREER':
            return <Briefcase className={className} />;
        case 'REGULATIONS':
            return <BookOpen className={className} />;
        case 'SKILLS':
            return <Shield className={className} />;
        case 'TECHNOLOGY':
        case 'TECH':
            return <Cpu className={className} />;
        default:
            return <Settings className={className} />;
    }
}
