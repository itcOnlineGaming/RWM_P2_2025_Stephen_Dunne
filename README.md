# SRL Distraction Logger

A TypeScript-based Svelte component library for tracking and analyzing focus patterns during study or work sessions.

## Project Structure

This is a monorepo containing:

```
RWM_P2_2025_Stephen_Dunne/
├── packages/
│   └── distraction-logger/          # The reusable component package
│       ├── src/
│       │   ├── DistractionLogger.svelte
│       │   ├── ActiveSession.svelte
│       │   ├── SessionResults.svelte
│       │   ├── StartState.svelte
│       │   ├── session.store.ts
│       │   ├── analytics.utils.ts
│       │   ├── types.ts
│       │   └── index.ts             # Public API exports
│       ├── stories/                 # Storybook stories
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
├── demo/                            # Demo SvelteKit app
│   ├── src/
│   │   ├── routes/
│   │   │   ├── +page.svelte
│   │   │   └── +layout.svelte
│   │   ├── app.html
│   │   └── app.css
│   ├── static/
│   ├── package.json
│   ├── svelte.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── .storybook/                      # Storybook configuration
├── e2e/                             # Playwright E2E tests
├── package.json                     # Root package with workspaces
└── README.md
```

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the demo app:
```bash
npm run dev
```

Run Storybook:
```bash
npm run storybook
```

### Building

Build the package:
```bash
npm run build:package
```

Build the demo:
```bash
npm run build:demo
```

Build everything:
```bash
npm run build
```

## Development Workflow

When developing in this monorepo:

1. **Edit package files** in `packages/distraction-logger/src/`
2. **Changes are live-reloaded** in the demo app automatically
3. **No build step needed** during development - Vite handles the package resolution
4. **Build the package** only when ready to publish or test production builds

The demo app directly imports from the package source files, so you get instant hot module replacement (HMR) when editing component files.

## Using the Package

### In the Demo App

The demo app uses a local file reference to the package for development:

```json
// demo/package.json
{
  "dependencies": {
    "@srl/distraction-logger": "file:../packages/distraction-logger"
  }
}
```

Then imports it normally:

```svelte
<!-- demo/src/routes/+page.svelte -->
<script lang="ts">
  import { DistractionLogger } from '@srl/distraction-logger';
</script>

<DistractionLogger />
```

### In Other Projects

Once published to npm, install via:

```bash
npm install @srl/distraction-logger
```

Or use the local package in your own SvelteKit project:

```json
{
  "dependencies": {
    "@srl/distraction-logger": "file:../path/to/packages/distraction-logger"
  }
}
```

Then import and use:

```svelte
<script lang="ts">
  import { DistractionLogger } from '@srl/distraction-logger';
</script>

<DistractionLogger />
```

## Overview

The SRL (Self-Regulated Learning) Distraction Logger focuses on the ability to recognize and understand distraction patterns during focused work.

This package provides an actionable approach to logging distractions in real-time, giving the user insights through visual analytics, and offering evidence-based suggestions for improving focus over time.

## The Problem

Self-regulated learners and knowledge workers face several challenges:

1. **Lack of awareness** - Most people underestimate their distraction frequency
2. **Pattern blindness** - Without data, it's difficult to identify when distractions occur or why
4. **No feedback loop** - Improvement requires measurement, but measurement is time-consuming

## The Solution

The SRL Distraction Logger implements an evidence-based tracking system that:

- **Captures distraction events** with minimal intrusion (single-tap logging)
- **Categorizes by severity** to distinguish between minor distractions and major context switches
- **Creates visual patterns** through temporal heatmaps showing when focus degrades
- **Gives personalized recommendations** based on observed behavior patterns

## Architecture

### Package Structure

The DistractionLogger is organized as a **publishable npm package** located in `packages/distraction-logger/`:

```
packages/distraction-logger/
├── src/
│   ├── DistractionLogger.svelte    # Main component (facade pattern)
│   ├── StartState.svelte           # Start screen
│   ├── ActiveSession.svelte        # Active session tracking
│   ├── SessionResults.svelte       # Results & analytics
│   ├── session.store.ts            # Svelte stores (bundled)
│   ├── analytics.utils.ts          # Analytics functions (bundled)
│   ├── types.ts                    # TypeScript types (bundled)
│   └── index.ts                    # Public API exports
├── package.json
├── tsconfig.json
└── README.md                       # Component documentation
```

**Key Design Principles:**
- **Zero External Dependencies**: Only peer dependency on Svelte
- **Single Entry Point**: Import everything from `@srl/distraction-logger`
- **Workspace Integration**: Uses npm workspaces for monorepo management
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
import { DistractionLogger } from '@srl/distraction-logger';
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
  import { DistractionLogger } from '@srl/distraction-logger';
</script>

<DistractionLogger />
```
