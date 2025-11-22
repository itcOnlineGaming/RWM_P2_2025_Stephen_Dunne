export type DistractionType = 'quick_check' | 'got_distracted' | 'major_break';

export interface Distraction {
  type: DistractionType;
  timestamp: number;
}

export interface SessionState {
  isActive: boolean;
  startTime: number | null;
  endTime: number | null;
  distractions: Distraction[];
  duration: number; // in minutes
}

export interface DistractionTypeConfig {
  id: DistractionType;
  label: string;
  description: string;
  icon: string;
  maxDuration: number; // in seconds
}

export interface Suggestion {
  title: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
}

export type HeatmapData = number[];

export type DistractionIntensity = 'low' | 'medium' | 'high';