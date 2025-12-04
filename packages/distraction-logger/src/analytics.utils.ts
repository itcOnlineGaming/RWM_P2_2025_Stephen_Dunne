import type {
  DistractionType,
  DistractionTypeConfig,
  Distraction,
  Suggestion,
  HeatmapData,
  DistractionIntensity
} from './types';

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
  
  // Early return for very short sessions (less than 5 minutes)
  if (duration < 5) {
    suggestions.push({
      title: 'Extend Your Focus Sessions',
      priority: 'MEDIUM',
      description: 'This session was quite short. Try aiming for at least 15-25 minutes to build meaningful focus patterns.'
    });
    return suggestions;
  }

  // Calculate distraction rate (per hour for consistency)
  const distractionsPerHour = duration > 0 ? (distractionCount / duration) * 60 : 0;
  
  // Count distraction types
  const quickChecks = distractions.filter(d => d.type === 'quick_check').length;
  const moderateDistractions = distractions.filter(d => d.type === 'got_distracted').length;
  const majorBreaks = distractions.filter(d => d.type === 'major_break').length;

  // Find peak distraction time (only if there are distractions)
  const maxDistractions = distractionCount > 0 ? Math.max(...heatmap) : 0;
  const peakIntervalIndex = maxDistractions > 0 ? heatmap.indexOf(maxDistractions) : -1;
  const peakTime = peakIntervalIndex >= 0 ? peakIntervalIndex * 5 : 0;

  // SUGGESTION 1: High distraction rate - need structured breaks
  // Triggers when there are many distractions relative to session length
  if (distractionCount >= 5 && distractionsPerHour >= 15) {
    suggestions.push({
      title: 'Schedule Regular Breaks',
      priority: 'HIGH',
      description: 'High distraction count suggests mental fatigue. Plan breaks every 25-30 minutes to maintain focus and prevent burnout.'
    });
  }

  // SUGGESTION 2: Peaked distraction pattern - try Pomodoro
  // Triggers when distractions cluster in specific time periods
  if (maxDistractions >= 2 && duration >= 15 && peakIntervalIndex >= 0) {
    suggestions.push({
      title: 'Try the Pomodoro Technique',
      priority: 'HIGH',
      description: `Your distractions peaked around ${peakTime}-${peakTime + 5} minutes. Consider breaking sessions into 25-minute intervals with 5-minute breaks.`
    });
  }

  // SUGGESTION 3: Many moderate distractions - notification management
  // Only triggers if there are actually distractions AND most are moderate
  if (distractionCount >= 3 && moderateDistractions >= distractionCount * 0.6) {
    suggestions.push({
      title: 'Silence Notifications',
      priority: 'MEDIUM',
      description: 'Most distractions were moderate interruptions. Enable Do Not Disturb mode or use Focus modes during work sessions.'
    });
  }

  // SUGGESTION 4: Many quick checks - phone/device management
  // Triggers when user keeps briefly checking things
  if (distractionCount >= 4 && quickChecks >= distractionCount * 0.5) {
    suggestions.push({
      title: 'Remove Device Temptations',
      priority: 'MEDIUM',
      description: 'You had many quick checks. Try placing your phone in another room or using app blockers during focus time.'
    });
  }

  // SUGGESTION 5: Major breaks - context switching problem
  // Triggers when user takes long breaks that break flow
  if (majorBreaks >= 2 && duration >= 15) {
    suggestions.push({
      title: 'Minimize Context Switching',
      priority: 'HIGH',
      description: 'Multiple major breaks detected. Try to batch similar tasks together and eliminate unnecessary context switches.'
    });
  }

  // SUGGESTION 6: Good focus but short session - encourage longer sessions
  // For users doing well but not pushing duration
  if (duration >= 10 && duration < 25 && distractionCount <= 2 && distractionsPerHour < 8) {
    suggestions.push({
      title: 'Extend Your Sessions',
      priority: 'LOW',
      description: 'You maintained excellent focus! Try extending your sessions to 45-60 minutes to build deeper concentration and flow states.'
    });
  }

  // SUGGESTION 7: Perfect or near-perfect session - positive reinforcement
  // For sessions with very few distractions
  if (duration >= 15 && distractionCount <= 1 && distractionsPerHour < 4) {
    suggestions.push({
      title: 'Excellent Focus!',
      priority: 'LOW',
      description: 'You demonstrated strong focus this session. Maintain this momentum by keeping your environment consistent and distraction-free.'
    });
  }

  // SUGGESTION 8: Moderate session quality - general improvement
  // For average sessions that don't fit other patterns
  if (distractionCount >= 2 && distractionCount < 5 && distractionsPerHour >= 8 && distractionsPerHour < 15) {
    suggestions.push({
      title: 'Identify Your Triggers',
      priority: 'MEDIUM',
      description: 'Track what causes your distractions. Common triggers include notifications, hunger, fatigue, or unclear task goals.'
    });
  }

  // FALLBACK: Generic encouragement if no specific suggestions apply
  if (suggestions.length === 0) {
    // For zero or very few distractions - positive message
    if (distractionCount <= 1) {
      suggestions.push({
        title: 'Keep Building Your Focus Habit',
        priority: 'LOW',
        description: 'Great start! Continue tracking your sessions to identify patterns. Aim for 25-50 minute focused work blocks for optimal productivity.'
      });
    } else {
      // For sessions that don't fit any pattern but have some distractions
      suggestions.push({
        title: 'Track More Sessions for Insights',
        priority: 'LOW',
        description: 'Complete more sessions to identify your distraction patterns. Consistency in tracking will reveal helpful trends and opportunities for improvement.'
      });
    }
  }

  // Return up to 3 suggestions, prioritizing HIGH > MEDIUM > LOW
  return suggestions
    .sort((a, b) => {
      const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 3);
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