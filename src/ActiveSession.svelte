<script lang="ts">
  import { sessionStore, elapsedTime } from './session.store';
  import { DISTRACTION_TYPES, formatTime } from './analytics.utils';
  import type { DistractionType } from './types';

  interface Props {
    onEnd?: () => void;
  }

  let { onEnd = () => {} }: Props = $props();

  const logDistraction = (type: DistractionType): void => {
    sessionStore.logDistraction(type);
  };

  const handleEndSession = (): void => {
    sessionStore.endSession();
    onEnd();
  };
</script>

<div class="active-session">
  <div class="container">
    <div class="header">
      <h2>Session Active</h2>
      <div class="timer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span class="time">{formatTime($elapsedTime)}</span>
      </div>
    </div>

    <div class="distraction-log">
      <h3>LOG A DISTRACTION</h3>

      <div class="distraction-buttons">
        <button
          class="distraction-card"
          onclick={() => logDistraction('quick_check')}
        >
          <div class="card-icon">{DISTRACTION_TYPES.quick_check.icon}</div>
          <div class="card-content">
            <div class="card-title">{DISTRACTION_TYPES.quick_check.label}</div>
            <div class="card-description">{DISTRACTION_TYPES.quick_check.description}</div>
          </div>
        </button>

        <button
          class="distraction-card"
          onclick={() => logDistraction('got_distracted')}
        >
          <div class="card-icon">{DISTRACTION_TYPES.got_distracted.icon}</div>
          <div class="card-content">
            <div class="card-title">{DISTRACTION_TYPES.got_distracted.label}</div>
            <div class="card-description">{DISTRACTION_TYPES.got_distracted.description}</div>
          </div>
        </button>

        <button
          class="distraction-card"
          onclick={() => logDistraction('major_break')}
        >
          <div class="card-icon">{DISTRACTION_TYPES.major_break.icon}</div>
          <div class="card-content">
            <div class="card-title">{DISTRACTION_TYPES.major_break.label}</div>
            <div class="card-description">{DISTRACTION_TYPES.major_break.description}</div>
          </div>
        </button>
      </div>
    </div>

    <button class="end-button" onclick={handleEndSession}>
      End Session
    </button>
  </div>
</div>

<style>
  .active-session {
    min-height: 100vh;
    min-height: 100dvh;
    background: #18181b;
    padding: 2rem 1rem;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
  }

  .header {
    background: #27272a;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #3f3f46;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: #f1f5f9;
  }

  .timer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #ff2d20;
    font-weight: 600;
  }

  .timer svg {
    flex-shrink: 0;
  }

  .time {
    font-size: 1.25rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .distraction-log {
    background: #27272a;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #3f3f46;
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: #a1a1aa;
    margin: 0 0 1rem 0;
  }

  .distraction-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .distraction-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #18181b;
    border: 1.5px solid #3f3f46;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }

  .distraction-card:hover {
    border-color: #ff2d20;
    background: #27272a;
    transform: translateX(4px);
  }

  .distraction-card:active {
    transform: translateX(2px);
  }

  .card-icon {
    font-size: 1.75rem;
    flex-shrink: 0;
  }

  .card-content {
    flex: 1;
    min-width: 0;
  }

  .card-title {
    font-size: 1rem;
    font-weight: 600;
    color: #f1f5f9;
    margin-bottom: 0.125rem;
  }

  .card-description {
    font-size: 0.875rem;
    color: #a1a1aa;
  }

  .end-button {
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

  .end-button:hover {
    background: #e02615;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 45, 32, 0.4);
  }

  .end-button:active {
    transform: translateY(0);
  }
</style>
