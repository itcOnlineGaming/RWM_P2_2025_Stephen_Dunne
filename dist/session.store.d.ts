import { type Writable, type Readable } from 'svelte/store';
import type { SessionState, DistractionType } from './types';
interface SessionStore extends Writable<SessionState> {
    startSession: () => void;
    endSession: () => void;
    logDistraction: (type: DistractionType, timestamp?: number) => void;
    reset: () => void;
}
export declare const sessionStore: SessionStore;
export declare const elapsedTime: Readable<number>;
export {};
//# sourceMappingURL=session.store.d.ts.map