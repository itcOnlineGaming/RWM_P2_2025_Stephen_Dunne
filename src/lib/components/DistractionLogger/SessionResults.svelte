<script lang="ts">
  import { sessionStore } from './session.store';
  import {
    calculateFocusScore,
    generateDistractionHeatmap,
    generateSuggestions,
    getDistractionIntensity,
    formatDuration
  } from './analytics.utils';
  import type { Suggestion } from './types';

  interface Props {
    onReset?: () => void;
  }

  let { onReset = () => {} }: Props = $props();

  let focusScore = $derived(
    calculateFocusScore($sessionStore.duration, $sessionStore.distractions.length)
  );

  let heatmap = $derived(
    generateDistractionHeatmap(
      $sessionStore.distractions,
      $sessionStore.startTime || Date.now(),
      $sessionStore.duration
    )
  );

  let suggestions = $derived(
    generateSuggestions($sessionStore.duration, $sessionStore.distractions, heatmap)
  );

  const handleNewSession = (): void => {
    sessionStore.reset();
    onReset();
  };

  const getPriorityColor = (priority: Suggestion['priority']): string => {
    switch(priority) {
      case 'HIGH': return '#ff2d20';
      case 'MEDIUM': return '#f59e0b';
      case 'LOW': return '#10b981';
      default: return '#71717a';
    }
  };
</script>

<div class="session-results">
  <div class="container">
    <div class="header">
      <h1>Session Complete!</h1>

      <div class="stats">
        <div class="stat">
          <div class="stat-label">DURATION</div>
          <div class="stat-value">{formatDuration($sessionStore.duration)}</div>
        </div>
        <div class="stat">
          <div class="stat-label">DISTRACTIONS</div>
          <div class="stat-value">{$sessionStore.distractions.length}</div>
        </div>
        <div class="stat">
          <div class="stat-label">FOCUS SCORE</div>
          <div class="stat-value highlight">{focusScore}%</div>
        </div>
      </div>
    </div>

    <div class="heatmap-section">
      <h3>Distraction Timeline (5 min intervals)</h3>
      <div class="heatmap">
        {#each heatmap as count, i}
          <div
            class="heatmap-bar"
            class:low={getDistractionIntensity(count) === 'low'}
            class:medium={getDistractionIntensity(count) === 'medium'}
            class:high={getDistractionIntensity(count) === 'high'}
            title="{count} distraction{count !== 1 ? 's' : ''} at {i * 5}-{(i + 1) * 5} min"
          ></div>
        {/each}
      </div>
      <div class="heatmap-legend">
        <span>Low</span>
        <div class="legend-gradient"></div>
        <span>High</span>
      </div>
    </div>

    {#if suggestions.length > 0}
      <div class="suggestions-section">
        <h1>Suggestions for Improvement:</h1>
        <div class="suggestions">
          {#each suggestions as suggestion}
            <div class="suggestion-card">
              <div class="suggestion-header">
                <div class="suggestion-title">{suggestion.title}</div>
                <span
                  class="priority-badge"
                  style="background-color: {getPriorityColor(suggestion.priority)};"
                >
                  {suggestion.priority}
                </span>
              </div>
              <p class="suggestion-description">{suggestion.description}</p>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <button class="new-session-button" onclick={handleNewSession}>
      Start New Session
    </button>
  </div>
</div>

<style>
  .session-results {
    min-height: 100vh;
    min-height: 100dvh;
    background: #18181b;
    padding: 2rem 1rem;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  .header {
    background: #27272a;
    padding: 2rem;
    border-radius: 8px;
    border: 1px solid #3f3f46;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 2rem 0;
    color: #f1f5f9;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 2rem;
  }

  .stat {
    text-align: center;
  }

  .stat-label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: #a1a1aa;
    margin-bottom: 0.5rem;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #f1f5f9;
  }

  .stat-value.highlight {
    color: #ff2d20;
  }

  .heatmap-section {
    background: #27272a;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #3f3f46;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #f1f5f9;
    margin: 0 0 1rem 0;
  }

  .heatmap {
    display: flex;
    gap: 4px;
    padding: 1rem 0;
    overflow-x: auto;
  }

  .heatmap-bar {
    flex: 1;
    min-width: 20px;
    height: 40px;
    background: #3f3f46;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .heatmap-bar.low {
    background: #065f46;
  }

  .heatmap-bar.medium {
    background: #92400e;
  }

  .heatmap-bar.high {
    background: #7f1d1d;
  }

  .heatmap-bar:hover {
    transform: translateY(-2px);
    opacity: 0.8;
  }

  .heatmap-legend {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #a1a1aa;
    margin-top: 0.5rem;
  }

  .legend-gradient {
    flex: 1;
    height: 8px;
    background: linear-gradient(to right, #065f46, #92400e, #7f1d1d);
    border-radius: 4px;
  }

  .suggestions-section {
    background: #27272a;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #3f3f46;
    margin-bottom: 1.5rem;
  }

  .suggestions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .suggestion-card {
    padding: 1.25rem;
    background: #18181b;
    border: 1px solid #3f3f46;
    border-radius: 8px;
    border-left: 3px solid #ff2d20;
  }

  .suggestion-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .suggestion-title {
    font-size: 1rem;
    font-weight: 600;
    color: #f1f5f9;
  }

  .priority-badge {
    padding: 0.25rem 0.625rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    border-radius: 4px;
    white-space: nowrap;
  }

  .suggestion-description {
    margin: 0;
    font-size: 0.9375rem;
    color: #cbd5e1;
    line-height: 1.6;
  }

  .new-session-button {
    width: 100%;
    padding: 1rem;
    background: #ff2d20;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(255, 45, 32, 0.3);
  }

  .new-session-button:hover {
    background: #e02615;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 45, 32, 0.4);
  }

  .new-session-button:active {
    transform: translateY(0);
  }
</style>
