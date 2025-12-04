# @srl/distraction-logger

A reusable Svelte component package for tracking focus sessions and logging distractions during study or work sessions.

## Features

- **Session Management**: Start, track, and end focus sessions
- **Distraction Logging**: Three predefined distraction types (Quick Check, Got Distracted, Major Break)
- **Analytics**: Focus score calculation, distraction heatmap, and personalized suggestions
- **Zero Dependencies**: Only peer dependency on Svelte 5
- **TypeScript**: Full type safety with exported types
- **Exportable**: All utilities, types, and stores available for customization

## Installation

### From npm (when published)

```bash
npm install @srl/distraction-logger
```

### Local Development

Use a file reference in your `package.json`:

```json
{
  "dependencies": {
    "@srl/distraction-logger": "file:../path/to/packages/distraction-logger"
  }
}
```

## Basic Usage

```svelte
<script lang="ts">
  import { DistractionLogger } from '@srl/distraction-logger';
</script>

<DistractionLogger />
```

That's it! The component manages all its own state internally.

## Package Structure

```
@srl/distraction-logger/
├── src/
│   ├── DistractionLogger.svelte    # Main component (facade)
│   ├── StartState.svelte           # Start screen
│   ├── ActiveSession.svelte        # Active session screen
│   ├── SessionResults.svelte       # Results screen
│   ├── session.store.ts            # Svelte store for session state
│   ├── analytics.utils.ts          # Analytics and calculations
│   ├── types.ts                    # TypeScript type definitions
│   └── index.ts                    # Public API exports
├── package.json
├── tsconfig.json
└── README.md                       # This file
```

## Advanced Usage

### Accessing Session State

```svelte
<script lang="ts">
  import { DistractionLogger, sessionStore } from '@srl/distraction-logger';

  // Access the current session state
  $effect(() => {
    console.log($sessionStore);
  });
</script>
```

### Using Exported Types

```typescript
import type {
  DistractionType,
  SessionState,
  Suggestion
} from '@srl/distraction-logger';

const customDistraction: DistractionType = 'quick_check';
```

### Using Utility Functions

```svelte
<script lang="ts">
  import {
    calculateFocusScore,
    formatDuration
  } from '@srl/distraction-logger';

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
