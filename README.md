# SRL Distraction Logger

A Svelte 5 component library for tracking and analyzing focus patterns during study or work sessions.

## Quick Installation

```bash
npm install "github:itcOnlineGaming/RWM_P2_2025_Stephen_Dunne#package-only"
```

## Usage

```svelte
<script lang="ts">
  import { DistractionLogger } from '@srl/distraction-logger';
</script>

<DistractionLogger />
```

## Features

- **Session Management** - Start, track, and end focus sessions with a live timer
- **Three-Tier Distraction Logging** - Quick Check (< 30s), Got Distracted (1-5 min), Major Break (> 5 min)
- **Focus Score** - Automatic calculation of concentration level (0-100)
- **Temporal Heatmap** - Visual timeline showing when distractions occurred
- **Smart Suggestions** - Personalized recommendations based on your distraction patterns
- **Zero Dependencies** - Only peer dependency on Svelte 5
- **Full TypeScript Support** - Complete type safety with exported types

## Try the Demo

```bash
git clone https://github.com/itcOnlineGaming/RWM_P2_2025_Stephen_Dunne.git
cd RWM_P2_2025_Stephen_Dunne
npm install
npm run dev
```

Open http://localhost:5173

## Project Structure

This is a monorepo containing:

```
RWM_P2_2025_Stephen_Dunne/
├── packages/
│   └── distraction-logger/          # The reusable component package
│       ├── src/
│       │   ├── DistractionLogger.svelte    # Main component
│       │   ├── ActiveSession.svelte        # Session tracking UI
│       │   ├── SessionResults.svelte       # Analytics & results
│       │   ├── StartState.svelte           # Start screen
│       │   ├── session.store.ts            # State management
│       │   ├── analytics.utils.ts          # Analytics engine
│       │   ├── types.ts                    # TypeScript types
│       │   └── index.ts                    # Public exports
│       └── package.json
├── demo/                               # Demo SvelteKit app
├── .storybook/                         # Component documentation
└── README.md                           # This file
```

### Getting Started

```bash
# Install dependencies
npm install

# Run the demo app
npm run dev

# Build the package
npm run build:package

```

### Basic Usage

```svelte
<script lang="ts">
  import { DistractionLogger } from '@srl/distraction-logger';
</script>

<DistractionLogger />
```

### Advanced: Accessing State

```svelte
<script lang="ts">
  import { DistractionLogger, sessionStore } from '@srl/distraction-logger';

  $effect(() => {
    if ($sessionStore.isActive) {
      console.log('Session is active!');
    }
  });
</script>

<DistractionLogger />
```