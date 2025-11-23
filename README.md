# SRL Distraction Logger

A TypeScript-based Svelte component library for tracking and analyzing focus patterns during study or work sessions.

## Overview

The SRL (Self-Regulated Learning) Distraction Logger focuses on the ability to recognize and understand distraction patterns during focused work.

This package provides an actionable approach to logging distractions in real-time, giving the user insights through visual analytics, and offering evidence-based suggestions for improving focus over time.

## Installation

Copy the package into your SvelteKit project:

```bash
cp -r src/lib/* your-project/src/lib/
```

Add to your routes:

```typescript
// src/routes/+page.svelte
import { DistractionLogger } from '$lib';
```

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

```
src/lib/
├── types/           Type definitions for sessions and distractions
├── stores/          Svelte stores for state management
├── utils/           Analytics and calculation functions
└── components/      UI components for each application state
```

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

```typescript
<script lang="ts">
  import { DistractionLogger } from '$lib';
</script>

<DistractionLogger />
```

### Advanced Integration with Data Persistence

```typescript
<script lang="ts">
  import { sessionStore } from '$lib';
  
  $effect(() => {
    if ($sessionStore.endTime) {
      // Save session data
      saveToDatabase($sessionStore);
    }
  });
</script>
```

### Custom Analytics

```typescript
<script lang="ts">
  import { calculateFocusScore, generateDistractionHeatmap } from '$lib';
  
  const score = calculateFocusScore(duration, distractionCount);
  const heatmap = generateDistractionHeatmap(distractions, startTime, duration);
</script>
```
