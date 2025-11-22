<script lang="ts">
  import { sessionStore } from '../stores/session';
  import StartState from './StartState.svelte';
  import ActiveSession from './ActiveSession.svelte';
  import SessionResults from './SessionResults.svelte';
  
  type Screen = 'start' | 'active' | 'results';
  
  let currentScreen = $state<Screen>('start');
  
  $effect(() => {
    if ($sessionStore.isActive) {
      currentScreen = 'active';
    } else if ($sessionStore.endTime) {
      currentScreen = 'results';
    } else {
      currentScreen = 'start';
    }
  });
  
  const handleStart = (): void => {
    currentScreen = 'active';
  };
  
  const handleEnd = (): void => {
    currentScreen = 'results';
  };
  
  const handleReset = (): void => {
    currentScreen = 'start';
  };
</script>

<div class="distraction-logger">
  {#if currentScreen === 'start'}
    <StartState onStart={handleStart} />
  {:else if currentScreen === 'active'}
    <ActiveSession onEnd={handleEnd} />
  {:else if currentScreen === 'results'}
    <SessionResults onReset={handleReset} />
  {/if}
</div>

<style>
  .distraction-logger {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  :global(*) {
    box-sizing: border-box;
  }
</style>