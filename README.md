# SRL Distraction Logger

A TypeScript-based Svelte component library for tracking and analyzing focus patterns during study or work sessions.

## Overview

The SRL (Self-Regulated Learning) Distraction Logger focuses on the ability to recognize and understand distraction patterns during focused work.

This package provides an actionable approach to logging distractions in real-time, giving the user insights through visual analytics, and offering evidence-based suggestions for improving focus over time.

## Installation

The DistractionLogger is a self-contained, reusable component package. Copy just the package folder to your SvelteKit project:

```bash
cp -r src/lib/components/DistractionLogger your-project/src/lib/components/
```

Add to your routes:

```svelte
<!-- src/routes/+page.svelte -->
<script>
  import { DistractionLogger } from '$lib/components/DistractionLogger';
</script>

<DistractionLogger />
```

That's it! The component includes all dependencies internally (types, stores, utilities).

## The Problem

Self-regulated learners and knowledge workers face several challenges:

1. **Lack of awareness** - Most people underestimate their distraction frequency
2. **Pattern blindness** - Without data, it's difficult to identify when distractions cluster
3. **Generic advice** - Productivity tips rarely account for individual distraction patterns
4. **No feedback loop** - Improvement requires measurement, but measurement is cumbersome

Traditional approaches like Pomodoro timers or time-blocking provide structure but lack diagnostic capability. They tell you when to work, not why focus was lost or how to adapt.

## The Solution

The SRL Distraction Logger implements an evidence-based tracking system that:

- **Captures distraction events** with minimal intrusion (single-tap logging)
- **Categorizes by severity** to distinguish between minor distractions and major context switches
- **Creates visual patterns** through temporal heatmaps showing when focus degrades
- **Gives personalized recommendations** based on observed behavior patterns

## Architecture

### Package Structure

The DistractionLogger is organized as a **self-contained component package** - all dependencies are bundled internally for maximum portability:

```
src/lib/components/DistractionLogger/
├── DistractionLogger.svelte    # Main component (facade pattern)
├── StartState.svelte           # Start screen
├── ActiveSession.svelte        # Active session tracking
├── SessionResults.svelte       # Results & analytics
├── session.store.ts            # Svelte stores (bundled)
├── analytics.utils.ts          # Analytics functions (bundled)
├── types.ts                    # TypeScript types (bundled)
├── index.ts                    # Public API exports
└── README.md                   # Component documentation
```

**Key Design Principles:**
- **Zero External Dependencies**: All imports are relative within the package
- **Single Entry Point**: Import everything from `DistractionLogger/index.ts`
- **Portable**: Copy the folder to any Svelte project - it just works
- **Extensible**: Exports types, stores, and utilities for customization

### Component Overview

#### DistractionLogger

The main component that manages application state and screen transitions.

**Responsibilities:**
- State management coordination
- Screen routing (start, active, results)
- Session lifecycle management

**Usage:**
```typescript
import { DistractionLogger } from '$lib';
```

#### StartState

Initial screen presenting the session initiation interface.

**Features:**
- Minimalist design to reduce cognitive load
- Clear call-to-action to start a session
- Dark theme for reduced visual strain

#### ActiveSession

Real-time distraction logging interface used during focus sessions.

**Features:**
- Live session timer
- Three-tier distraction classification system:
  - Quick Check: Brief interruptions under 30 seconds
  - Got Distracted: Moderate interruptions 1-5 minutes
  - Major Break: Context switches exceeding 5 minutes
- One-tap logging mechanism to minimize disruption
- Session termination control

#### SessionResults

Post-session analytics and recommendations interface.

**Features:**
- Session metrics display (duration, distraction count, focus score)
- Temporal heatmap visualization
- Context-aware suggestion engine
- Session reset control

**Analytics:**
- Focus score: 0-100 scale based on distraction density
- Heatmap: 5-minute interval bins showing distraction clustering
- Suggestions: Pattern-based recommendations (Pomodoro technique, notification management, session length adjustment)

### State Management

The application uses Svelte stores for reactive state management:

**sessionStore:**
- Tracks active session state
- Maintains distraction log
- Calculates session duration
- Provides methods for session lifecycle control

**elapsedTime:**
- Derived store providing real-time session duration
- Updates every second during active sessions
- Automatically resets between sessions

## Usage Patterns

### Basic Integration

```svelte
<script lang="ts">
  import { DistractionLogger } from '$lib/components/DistractionLogger';
</script>

<DistractionLogger />
```

### Advanced Integration with Data Persistence

```svelte
<script lang="ts">
  import { DistractionLogger, sessionStore } from '$lib/components/DistractionLogger';

  $effect(() => {
    if ($sessionStore.endTime) {
      // Save session data to database or local storage
      saveToDatabase({
        duration: $sessionStore.duration,
        distractions: $sessionStore.distractions,
        timestamp: $sessionStore.endTime
      });
    }
  });
</script>

<DistractionLogger />
```

### Custom Analytics

```svelte
<script lang="ts">
  import {
    calculateFocusScore,
    generateDistractionHeatmap,
    type SessionState
  } from '$lib/components/DistractionLogger';

  const analyzeSession = (session: SessionState) => {
    const score = calculateFocusScore(session.duration, session.distractions.length);
    const heatmap = generateDistractionHeatmap(
      session.distractions,
      session.startTime || Date.now(),
      session.duration
    );

    return { score, heatmap };
  };
</script>
```

### Accessing All Exports

```svelte
<script lang="ts">
  // Everything is available from a single import path
  import {
    DistractionLogger,        // Main component
    sessionStore,             // Session state store
    elapsedTime,             // Derived elapsed time store
    DISTRACTION_TYPES,       // Distraction type configurations
    calculateFocusScore,     // Utility functions
    formatDuration,
    type DistractionType,    // TypeScript types
    type SessionState
  } from '$lib/components/DistractionLogger';
</script>
```
