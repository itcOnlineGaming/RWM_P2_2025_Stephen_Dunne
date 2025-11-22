// Components
export { default as DistractionLogger } from './components/DistractionLogger.svelte';
export { default as StartState } from './components/StartState.svelte';
export { default as ActiveSession } from './components/ActiveSession.svelte';
export { default as SessionResults } from './components/SessionResults.svelte';

// Stores
export { sessionStore, elapsedTime } from './stores/session';

// Utilities
export {
  DISTRACTION_TYPES,
  calculateFocusScore,
  generateDistractionHeatmap,
  generateSuggestions,
  getDistractionIntensity,
  formatTime,
  formatDuration
} from './utils/analytics';

// Types
export type {
  DistractionType,
  Distraction,
  SessionState,
  DistractionTypeConfig,
  Suggestion,
  HeatmapData,
  DistractionIntensity
} from './types';