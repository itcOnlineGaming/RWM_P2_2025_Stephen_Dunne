// Main component export
export { default as DistractionLogger } from './DistractionLogger.svelte';

// Export types for consumers who want to extend or customize
export type {
  DistractionType,
  Distraction,
  SessionState,
  DistractionTypeConfig,
  Suggestion,
  HeatmapData,
  DistractionIntensity
} from './types';

// Export store for advanced use cases (optional - consumers can manage their own state)
export { sessionStore, elapsedTime } from './session.store';

// Export utilities for customization (optional)
export {
  DISTRACTION_TYPES,
  calculateFocusScore,
  generateDistractionHeatmap,
  getDistractionIntensity,
  generateSuggestions,
  formatTime,
  formatDuration
} from './analytics.utils';
