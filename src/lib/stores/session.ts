import { writable, derived, type Writable, type Readable } from 'svelte/store';
import type { SessionState, DistractionType } from '../types';

interface SessionStore extends Writable<SessionState> {
  startSession: () => void;
  endSession: () => void;
  logDistraction: (type: DistractionType, timestamp?: number) => void;
  reset: () => void;
}

const createSessionStore = (): SessionStore => {
  const initialState: SessionState = {
    isActive: false,
    startTime: null,
    endTime: null,
    distractions: [],
    duration: 0
  };

  const { subscribe, set, update } = writable<SessionState>(initialState);

  return {
    subscribe,
    set,
    update,
    
    startSession: (): void => {
      update((state) => ({
        ...state,
        isActive: true,
        startTime: Date.now(),
        endTime: null,
        distractions: []
      }));
    },
    
    endSession: (): void => {
      update((state) => {
        const endTime = Date.now();
        const duration = state.startTime 
          ? Math.floor((endTime - state.startTime) / 1000 / 60)
          : 0;
        
        return {
          ...state,
          isActive: false,
          endTime,
          duration
        };
      });
    },
    
    logDistraction: (type: DistractionType, timestamp: number = Date.now()): void => {
      update((state) => ({
        ...state,
        distractions: [...state.distractions, { type, timestamp }]
      }));
    },
    
    reset: (): void => {
      set(initialState);
    }
  };
};

export const sessionStore = createSessionStore();

export const elapsedTime: Readable<number> = derived(
  sessionStore,
  ($session, set) => {
    if (!$session.isActive) {
      set(0);
      return;
    }
    
    const interval = setInterval(() => {
      const elapsed = $session.startTime 
        ? Math.floor((Date.now() - $session.startTime) / 1000)
        : 0;
      set(elapsed);
    }, 1000);
    
    return () => clearInterval(interval);
  },
  0
);