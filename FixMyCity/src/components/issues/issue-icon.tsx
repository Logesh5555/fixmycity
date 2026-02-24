import {
  CircleDotDashed,
  LightbulbOff,
  Waves,
  Trash2,
  Construction,
  HelpCircle,
} from 'lucide-react';
import type { Issue } from '@/lib/types';
import { cn } from '@/lib/utils';

const issueTypeIcons: Record<Issue['type'], React.ElementType> = {
  pothole: CircleDotDashed,
  'street light out': LightbulbOff,
  'drainage problem': Waves,
  'waste accumulation': Trash2,
  'damaged road': Construction,
  other: HelpCircle,
};

export function IssueIcon({ type, className }: { type: Issue['type'], className?: string }) {
  const Icon = issueTypeIcons[type];
  return <Icon className={cn("h-4 w-4", className)} />;
}
