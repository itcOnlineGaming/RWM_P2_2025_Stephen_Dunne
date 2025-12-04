import { writable, derived } from 'svelte/store';
const createSessionStore = () => {
    const initialState = {
        isActive: false,
        startTime: null,
        endTime: null,
        distractions: [],
        duration: 0
    };
    const { subscribe, set, update } = writable(initialState);
    return {
        subscribe,
        set,
        update,
        startSession: () => {
            update((state) => ({
                ...state,
                isActive: true,
                startTime: Date.now(),
                endTime: null,
                distractions: []
            }));
        },
        endSession: () => {
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
        logDistraction: (type, timestamp = Date.now()) => {
            update((state) => ({
                ...state,
                distractions: [...state.distractions, { type, timestamp }]
            }));
        },
        reset: () => {
            set(initialState);
        }
    };
};
export const sessionStore = createSessionStore();
export const elapsedTime = derived(sessionStore, ($session, set) => {
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
}, 0);
