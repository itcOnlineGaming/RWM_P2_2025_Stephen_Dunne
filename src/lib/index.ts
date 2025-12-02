// Re-export the self-contained DistractionLogger package
export {
  DistractionLogger,
  sessionStore,
  elapsedTime,
  DISTRACTION_TYPES,
  calculateFocusScore,
  generateDistractionHeatmap,
  generateSuggestions,
  getDistractionIntensity,
  formatTime,
  formatDuration
} from './components/DistractionLogger';

export type {
  DistractionType,
  Distraction,
  SessionState,
  DistractionTypeConfig,
  Suggestion,
  HeatmapData,
  DistractionIntensity
} from './components/DistractionLogger';