import type { DistractionType, DistractionTypeConfig, Distraction, Suggestion, HeatmapData, DistractionIntensity } from './types';
export declare const DISTRACTION_TYPES: Record<DistractionType, DistractionTypeConfig>;
export declare const calculateFocusScore: (duration: number, distractionCount: number) => number;
export declare const generateDistractionHeatmap: (distractions: Distraction[], startTime: number, duration: number, intervalMinutes?: number) => HeatmapData;
export declare const getDistractionIntensity: (count: number) => DistractionIntensity;
export declare const generateSuggestions: (duration: number, distractions: Distraction[], heatmap: HeatmapData) => Suggestion[];
export declare const formatTime: (seconds: number) => string;
export declare const formatDuration: (minutes: number) => string;
//# sourceMappingURL=analytics.utils.d.ts.map