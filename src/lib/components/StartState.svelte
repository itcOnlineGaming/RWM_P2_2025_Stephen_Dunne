<script lang="ts">
  import { sessionStore } from '../stores/session';
  
  interface Props {
    onStart?: () => void;
  }
  
  let { onStart = () => {} }: Props = $props();
  
  const handleStartSession = (): void => {
    sessionStore.startSession();
    onStart();
  };
</script>

<div class="start-state">
  <div class="content">
    <div class="icon">🎯</div>
    <h1>Focus Session</h1>
    <p class="subtitle">Track your distractions and improve your focus over time</p>
    
    <button class="start-button" onclick={handleStartSession}>
      Start Session
    </button>
  </div>
</div>

<style>
  .start-state {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #18181b;
    padding: 2rem;
  }
  
  .content {
    text-align: center;
    color: white;
    max-width: 420px;
    width: 100%;
  }
  
  .icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    letter-spacing: -0.02em;
    color: #f1f5f9;
  }
  
  .subtitle {
    font-size: 1.125rem;
    opacity: 0.7;
    margin: 0 0 3rem 0;
    line-height: 1.6;
    color: #cbd5e1;
  }
  
  .start-button {
    background: #ff2d20;
    color: white;
    border: none;
    padding: 1rem 3rem;
    font-size: 1.125rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(255, 45, 32, 0.3);
  }
  
  .start-button:hover {
    background: #e02615;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 45, 32, 0.4);
  }
  
  .start-button:active {
    transform: translateY(0);
  }
</style>