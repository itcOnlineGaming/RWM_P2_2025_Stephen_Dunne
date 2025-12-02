# DistractionLogger Component

A self-contained, reusable Svelte component for tracking focus sessions and logging distractions.

## Features

- **Session Management**: Start, track, and end focus sessions
- **Distraction Logging**: Three predefined distraction types (Quick Check, Got Distracted, Major Break)
- **Analytics**: Focus score calculation, distraction heatmap, and personalized suggestions
- **Self-contained**: All dependencies bundled - no external imports required
- **TypeScript**: Full type safety with exported types

## Installation

Simply copy the entire `DistractionLogger` folder to your project's components directory.

## Basic Usage

```svelte
<script>
  import { DistractionLogger } from '$lib/components/DistractionLogger';
</script>

<DistractionLogger />
```

That's it! The component manages all its own state internally.

## Package Structure

```
DistractionLogger/
├── DistractionLogger.svelte    # Main component (facade)
├── StartState.svelte           # Start screen
├── ActiveSession.svelte        # Active session screen
├── SessionResults.svelte       # Results screen
├── session.store.ts            # Svelte store for session state
├── analytics.utils.ts          # Analytics and calculations
├── types.ts                    # TypeScript type definitions
├── index.ts                    # Public API exports
└── README.md                   # This file
```

## Advanced Usage

### Accessing Session State

```svelte
<script>
  import { DistractionLogger, sessionStore } from '$lib/components/DistractionLogger';

  // Access the current session state
  $: console.log($sessionStore);
</script>
```

### Using Exported Types

```typescript
import type {
  DistractionType,
  SessionState,
  Suggestion
} from '$lib/components/DistractionLogger';

const customDistraction: DistractionType = 'quick_check';
```

### Using Utility Functions

```svelte
<script>
  import {
    calculateFocusScore,
    formatDuration
  } from '$lib/components/DistractionLogger';

  const score = calculateFocusScore(60, 5); // 60 min session, 5 distractions
  const formatted = formatDuration(125); // "2h 5m"
</script>
```

## API Reference

### Main Component Props

The `DistractionLogger` component accepts no props - it's fully self-contained.

### Exported Store

- `sessionStore`: Main session state store
  - `startSession()`: Start a new session
  - `endSession()`: End the current session
  - `logDistraction(type)`: Log a distraction
  - `reset()`: Reset to initial state

- `elapsedTime`: Derived store with current elapsed time in seconds

### Exported Utilities

- `calculateFocusScore(duration, distractionCount)`: Calculate focus score (0-100)
- `generateDistractionHeatmap(distractions, startTime, duration)`: Generate heatmap data
- `generateSuggestions(duration, distractions, heatmap)`: Generate improvement suggestions
- `formatTime(seconds)`: Format seconds as MM:SS
- `formatDuration(minutes)`: Format minutes as Xh Ym
