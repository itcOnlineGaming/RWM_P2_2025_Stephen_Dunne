// Main component export
export { default as DistractionLogger } from './DistractionLogger.svelte';
// Export store for advanced use cases (optional - consumers can manage their own state)
export { sessionStore, elapsedTime } from './session.store';
// Export utilities for customization (optional)
export { DISTRACTION_TYPES, calculateFocusScore, generateDistractionHeatmap, getDistractionIntensity, generateSuggestions, formatTime, formatDuration } from './analytics.utils';
