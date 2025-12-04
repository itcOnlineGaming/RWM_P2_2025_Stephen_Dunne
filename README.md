# SRL Distraction Logger

A Svelte 5 component for tracking and analyzing focus patterns during study sessions.

## Quick Installation

```bash
npm install "github:itcOnlineGaming/RWM_P2_2025_Stephen_Dunne#main"
```

## Usage

```svelte
<script lang="ts">
  import { DistractionLogger } from '@srl/distraction-logger';
</script>

<DistractionLogger />
```

## Features

- 🎯 **Session Tracking** - Start and end focus sessions
- 📊 **Three-Tier Distraction Logging** - Quick Check, Got Distracted, Major Break
- 📈 **Focus Score** - Calculate your concentration level (0-100)
- 🗺️ **Temporal Heatmap** - Visualize when distractions occur
- 💡 **Smart Suggestions** - Get personalized tips to improve focus

## Development

### Run the Demo

```bash
npm install
npm run dev
```

Open http://localhost:5173

### Build the Package

```bash
npm run build:package
```

## Project Structure

```
├── packages/
│   └── distraction-logger/    # Main package
│       ├── src/
│       │   ├── DistractionLogger.svelte
│       │   ├── ActiveSession.svelte
│       │   ├── SessionResults.svelte
│       │   ├── StartState.svelte
│       │   ├── session.store.ts
│       │   ├── analytics.utils.ts
│       │   ├── types.ts
│       │   └── index.ts
│       └── package.json
├── demo/                      # Demo SvelteKit app
└── .storybook/               # Component stories
```

## Documentation

- [Package Documentation](./packages/distraction-logger/README.md)
- [Setup Guide](./GITHUB_SETUP_GUIDE.md)
- [Installation Methods](./INSTALLATION.md)

## Tech Stack

- Svelte 5
- TypeScript
- SvelteKit (demo)
- Vite