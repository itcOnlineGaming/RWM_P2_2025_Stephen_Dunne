import type {
  DistractionType,
  DistractionTypeConfig,
  Distraction,
  Suggestion,
  HeatmapData,
  DistractionIntensity
} from '../types';

export const DISTRACTION_TYPES: Record<DistractionType, DistractionTypeConfig> = {
  quick_check: {
    id: 'quick_check',
    label: 'Quick Check',
    description: 'Minor distraction (< 30s)',
    icon: '👀',
    maxDuration: 30
  },
  got_distracted: {
    id: 'got_distracted',
    label: 'Got Distracted',
    description: 'Moderate interruption (1-5 min)',
    icon: '📱',
    maxDuration: 300
  },
  major_break: {
    id: 'major_break',
    label: 'Major Break',
    description: 'Context switch (> 5 min)',
    icon: '⚠️',
    maxDuration: Infinity
  }
};

export const calculateFocusScore = (duration: number, distractionCount: number): number => {
  if (duration === 0) return 100;
  
  const distractionsPerHour = (distractionCount / duration) * 60;
  const score = Math.max(0, Math.min(100, 100 - (distractionsPerHour * 5)));
  
  return Math.round(score);
};

export const generateDistractionHeatmap = (
  distractions: Distraction[],
  startTime: number,
  duration: number,
  intervalMinutes: number = 5
): HeatmapData => {
  const intervals = Math.ceil(duration / intervalMinutes);
  const heatmap: HeatmapData = new Array(intervals).fill(0);
  
  distractions.forEach((distraction) => {
    const minutesElapsed = Math.floor((distraction.timestamp - startTime) / 1000 / 60);
    const intervalIndex = Math.floor(minutesElapsed / intervalMinutes);
    
    if (intervalIndex >= 0 && intervalIndex < intervals) {
      heatmap[intervalIndex]++;
    }
  });
  
  return heatmap;
};

export const getDistractionIntensity = (count: number): DistractionIntensity => {
  if (count === 0) return 'low';
  if (count === 1) return 'medium';
  return 'high';
};

export const generateSuggestions = (
  duration: number,
  distractions: Distraction[],
  heatmap: HeatmapData
): Suggestion[] => {
  const suggestions: Suggestion[] = [];
  const distractionCount = distractions.length;
  
  // Find peak distraction time
  const maxDistractions = Math.max(...heatmap);
  const peakIntervalIndex = heatmap.indexOf(maxDistractions);
  const peakTime = peakIntervalIndex * 5;
  
  // Suggestion 1: Pomodoro Technique
  if (maxDistractions >= 2 && duration > 20) {
    suggestions.push({
      title: 'Try the Pomodoro Technique',
      priority: 'HIGH',
      description: `Your distractions peaked around ${peakTime} minutes. Consider breaking sessions into 25-minute intervals with short breaks.`
    });
  }
  
  // Suggestion 2: Notification Management
  const moderateDistractions = distractions.filter(
    (d) => d.type === 'got_distracted'
  ).length;
  
  if (moderateDistractions >= distractionCount * 0.5) {
    suggestions.push({
      title: 'Silence Notifications',
      priority: 'MEDIUM',
      description: 'Most distractions were moderate interruptions. Enable Do Not Disturb mode during focus sessions.'
    });
  }
  
  // Suggestion 3: Longer Sessions
  if (duration < 20 && distractionCount <= 2) {
    suggestions.push({
      title: 'Extend Your Sessions',
      priority: 'LOW',
      description: 'You maintained good focus! Try extending your sessions to 45-60 minutes to build deeper concentration.'
    });
  }
  
  // Suggestion 4: Break Patterns
  if (distractionCount >= 5) {
    suggestions.push({
      title: 'Schedule Regular Breaks',
      priority: 'HIGH',
      description: 'High distraction count suggests mental fatigue. Plan breaks every 25-30 minutes to maintain focus.'
    });
  }
  
  return suggestions.slice(0, 3);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};